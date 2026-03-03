import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Loader2,
  LogIn,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, OrderStatus } from "../backend.d";
import type { Product } from "../backend.d";
import Navigation from "../components/Navigation";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useDeleteProduct,
  useIsAdmin,
  useOrders,
  useProducts,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "../hooks/useQueries";

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: Category.tea,
  imageUrl: "",
  inStock: true,
};

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.pending, label: "Pending" },
  { value: OrderStatus.confirmed, label: "Confirmed" },
  { value: OrderStatus.completed, label: "Completed" },
];

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    refetch: refetchAdmin,
  } = useIsAdmin();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const updateOrderStatus = useUpdateOrderStatus();

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(EMPTY_PRODUCT);

  useEffect(() => {
    document.title = "Admin Panel — Chai & Biscuit Co.";
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully");
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
    setProductDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
    });
    setProductDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          ...formData,
          id: editingProduct.id,
        });
        toast.success("Product updated successfully!");
      } else {
        await addProduct.mutateAsync({ ...formData, id: BigInt(0) });
        toast.success("Product added successfully!");
      }
      setProductDialogOpen(false);
    } catch {
      toast.error("Failed to save product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id: bigint, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success(`"${name}" deleted.`);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleUpdateStatus = async (id: bigint, status: OrderStatus) => {
    try {
      await updateOrderStatus.mutateAsync({ id, status });
      toast.success("Order status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const isLoading = isInitializing || isAdminLoading;
  const isLoggedIn = !!identity;
  const isAdmin = isAdminData === true;

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="page-enter min-h-screen bg-warm-deep flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="bg-card rounded-3xl shadow-warm-xl p-10 max-w-md w-full text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
              Admin Panel
            </h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              To access the admin panel, you need to log in with Internet
              Identity. Admin permissions are granted by the canister owner via{" "}
              <code className="bg-muted px-1 rounded text-xs">
                assignCallerUserRole
              </code>
              .
            </p>
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              data-ocid="admin.login.primary_button"
              className="w-full bg-primary text-primary-foreground font-display font-bold py-5 rounded-xl hover:scale-[1.01] transition-all gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Logged in but checking admin status
  if (isLoading) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center">
        <div data-ocid="admin.loading_state" className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-display">
            Verifying admin access…
          </p>
        </div>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="page-enter min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div
            data-ocid="admin.access_denied.error_state"
            className="bg-card rounded-3xl shadow-warm-xl p-10 max-w-md w-full text-center"
          >
            <div className="text-6xl mb-6">🚫</div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Access Denied
            </h2>
            <p className="text-muted-foreground mb-3 text-sm">
              Your account does not have admin privileges. Contact the shop
              owner to be granted admin access.
            </p>
            <p className="text-xs text-muted-foreground mb-8 bg-muted rounded-lg p-3">
              Principal:{" "}
              <span className="font-mono text-xs break-all">
                {identity?.getPrincipal().toString()}
              </span>
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 font-display"
                onClick={() => void refetchAdmin()}
                data-ocid="admin.retry.secondary_button"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button
                variant="outline"
                className="flex-1 font-display text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleLogout}
                data-ocid="admin.logout.secondary_button"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="page-enter">
      <Navigation />

      <div className="pt-20 min-h-screen bg-background">
        {/* Header */}
        <section className="bg-warm-deep text-warm-cream py-10 px-4">
          <div className="container mx-auto lg:px-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-display text-xs tracking-widest uppercase text-warm-gold mb-1">
                Admin Panel
              </p>
              <h1 className="font-serif text-4xl font-bold">Dashboard</h1>
              <p className="text-warm-cream/60 text-sm mt-1">
                Logged in as:{" "}
                <span className="font-mono text-xs text-warm-gold">
                  {identity?.getPrincipal().toString().slice(0, 20)}…
                </span>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-ocid="admin.logout.secondary_button"
              className="border-warm-cream/30 text-warm-cream hover:bg-warm-cream/10 font-display gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Tabs defaultValue="products" data-ocid="admin.tabs.tab">
            <TabsList className="bg-muted mb-6 h-auto p-1">
              <TabsTrigger
                value="products"
                className="font-display font-medium px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-ocid="admin.products.tab"
              >
                Products ({products?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="font-display font-medium px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-ocid="admin.orders.tab"
              >
                Orders ({orders?.length ?? 0})
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Product Management
                </h2>
                <Button
                  onClick={openAddDialog}
                  data-ocid="admin.product.open_modal_button"
                  className="bg-primary text-primary-foreground font-display font-semibold gap-2 hover:scale-105 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>

              {productsLoading ? (
                <div
                  data-ocid="admin.products.loading_state"
                  className="py-20 text-center"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground font-display">
                    Loading products…
                  </p>
                </div>
              ) : !products?.length ? (
                <div
                  data-ocid="admin.products.empty_state"
                  className="py-20 text-center"
                >
                  <div className="text-5xl mb-4">📦</div>
                  <p className="text-muted-foreground font-display">
                    No products yet. Add your first product!
                  </p>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-warm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-display font-semibold">
                          Name
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Category
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Price
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          In Stock
                        </TableHead>
                        <TableHead className="font-display font-semibold text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product, idx) => (
                        <TableRow
                          key={product.id.toString()}
                          data-ocid={`admin.product.row.${idx + 1}`}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="font-display capitalize text-xs"
                            >
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-serif font-bold">
                            ₹{product.price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={product.inStock}
                              onCheckedChange={async (checked) => {
                                try {
                                  await updateProduct.mutateAsync({
                                    ...product,
                                    inStock: checked,
                                  });
                                  toast.success(
                                    `Stock status updated for "${product.name}"`,
                                  );
                                } catch {
                                  toast.error("Failed to update stock status.");
                                }
                              }}
                              data-ocid={`admin.product.stock.switch.${idx + 1}`}
                              aria-label={`Toggle stock for ${product.name}`}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-accent/50"
                                onClick={() => openEditDialog(product)}
                                data-ocid={`admin.product.edit_button.${idx + 1}`}
                                aria-label={`Edit ${product.name}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                  void handleDeleteProduct(
                                    product.id,
                                    product.name,
                                  )
                                }
                                data-ocid={`admin.product.delete_button.${idx + 1}`}
                                aria-label={`Delete ${product.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Order Management
                </h2>
              </div>

              {ordersLoading ? (
                <div
                  data-ocid="admin.orders.loading_state"
                  className="py-20 text-center"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground font-display">
                    Loading orders…
                  </p>
                </div>
              ) : !orders?.length ? (
                <div
                  data-ocid="admin.orders.empty_state"
                  className="py-20 text-center"
                >
                  <div className="text-5xl mb-4">📋</div>
                  <p className="text-muted-foreground font-display">
                    No orders yet.
                  </p>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-warm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-display font-semibold">
                          Order ID
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Customer
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Items
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Total
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Status
                        </TableHead>
                        <TableHead className="font-display font-semibold">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, idx) => (
                        <TableRow
                          key={order.id.toString()}
                          data-ocid={`admin.order.row.${idx + 1}`}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-mono text-sm">
                            #{order.id.toString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            {order.customerName}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {order.items.length} item
                            {order.items.length !== 1 ? "s" : ""}
                          </TableCell>
                          <TableCell className="font-serif font-bold">
                            ₹{order.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(val) =>
                                void handleUpdateStatus(
                                  order.id,
                                  val as OrderStatus,
                                )
                              }
                            >
                              <SelectTrigger
                                className="w-36 h-8 text-xs font-display"
                                data-ocid={`admin.order.status.select.${idx + 1}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="text-xs font-display"
                                  >
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {new Date(
                              Number(order.timestamp / BigInt(1_000_000)),
                            ).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent
          className="sm:max-w-lg bg-card border-border"
          data-ocid="admin.product.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="p-name"
                className="font-display font-medium text-sm"
              >
                Name *
              </Label>
              <Input
                id="p-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Product name"
                data-ocid="admin.product.name.input"
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="p-category"
                className="font-display font-medium text-sm"
              >
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, category: val as Category }))
                }
              >
                <SelectTrigger
                  id="p-category"
                  data-ocid="admin.product.category.select"
                  className="bg-muted/50"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.tea}>🍵 Tea</SelectItem>
                  <SelectItem value={Category.coffee}>☕ Coffee</SelectItem>
                  <SelectItem value={Category.snacks}>🥨 Snacks</SelectItem>
                  <SelectItem value={Category.biscuits}>🍪 Biscuits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="p-desc"
                className="font-display font-medium text-sm"
              >
                Description
              </Label>
              <Textarea
                id="p-desc"
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Product description"
                rows={3}
                data-ocid="admin.product.description.textarea"
                className="bg-muted/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="p-price"
                  className="font-display font-medium text-sm"
                >
                  Price (₹) *
                </Label>
                <Input
                  id="p-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      price: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  data-ocid="admin.product.price.input"
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="p-imageUrl"
                  className="font-display font-medium text-sm"
                >
                  Image URL
                </Label>
                <Input
                  id="p-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  data-ocid="admin.product.imageurl.input"
                  className="bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="p-instock"
                checked={formData.inStock}
                onCheckedChange={(checked) =>
                  setFormData((p) => ({ ...p, inStock: checked }))
                }
                data-ocid="admin.product.instock.switch"
              />
              <Label
                htmlFor="p-instock"
                className="font-display font-medium text-sm cursor-pointer"
              >
                In Stock
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setProductDialogOpen(false)}
              data-ocid="admin.product.cancel_button"
              className="font-display"
            >
              Cancel
            </Button>
            <Button
              onClick={() => void handleSaveProduct()}
              disabled={addProduct.isPending || updateProduct.isPending}
              data-ocid="admin.product.save_button"
              className="bg-primary text-primary-foreground font-display font-semibold gap-2"
            >
              {addProduct.isPending || updateProduct.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : editingProduct ? (
                "Save Changes"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
