import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalSales: 0,
        totalRevenue: 0,
        totalPurchases: 0,
        totalPurchaseCost: 0,
        lowStockProducts: 0,
        recentSales: [],
        recentPurchases: [],
        topProducts: []
    });

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                // Fetch all necessary data in parallel
                const [productsRes, salesRes, purchasesRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/sales'),
                    fetch('/api/purchases')
                ]);

                const products = await productsRes.json();
                const sales = await salesRes.json();
                const purchases = await purchasesRes.json();

                // Calculate statistics
                const totalProducts = products.length;
                const totalSales = sales.length;
                const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.sale_amount), 0);
                const totalPurchases = purchases.length;
                const totalPurchaseCost = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.purchase_amount), 0);
                
                // Calculate low stock products (SOH + SIT < reorder level)
                const lowStockProducts = products.filter(p => 
                    (p.soh + p.sit) < p.reorder_level
                ).length;

                // Get recent sales (last 5)
                const recentSales = sales
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .map(sale => ({
                        ...sale,
                        product: products.find(p => p.id === sale.product_id)
                    }));

                // Get recent purchases (last 5)
                const recentPurchases = purchases
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .map(purchase => ({
                        ...purchase,
                        product: products.find(p => p.id === purchase.product_id)
                    }));

                // Calculate top selling products
                const productSalesCount = {};
                sales.forEach(sale => {
                    productSalesCount[sale.product_id] = (productSalesCount[sale.product_id] || 0) + 1;
                });

                const topProducts = Object.entries(productSalesCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([productId, count]) => ({
                        product: products.find(p => p.id === parseInt(productId)),
                        salesCount: count
                    }));

                setDashboardData({
                    totalProducts,
                    totalSales,
                    totalRevenue,
                    totalPurchases,
                    totalPurchaseCost,
                    lowStockProducts,
                    recentSales,
                    recentPurchases,
                    topProducts
                });

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="LoadingDashboard">Loading dashboard...</div>;
    }

    const grossProfit = dashboardData.totalRevenue - dashboardData.totalPurchaseCost;
    const profitMargin = dashboardData.totalRevenue > 0 
        ? ((grossProfit / dashboardData.totalRevenue) * 100).toFixed(1)
        : 0;

    return (
        <div className="Dashboard">
            <h1 className="DashboardTitle">Dashboard</h1>

            {/* Key Metrics Cards */}
            <div className="MetricsGrid">
                <div className="MetricCard revenue">
                    <div className="MetricIcon">💰</div>
                    <div className="MetricContent">
                        <h3>Total Revenue</h3>
                        <p className="MetricValue">${dashboardData.totalRevenue.toFixed(2)}</p>
                        <span className="MetricSubtext">{dashboardData.totalSales} sales</span>
                    </div>
                </div>

                <div className="MetricCard profit">
                    <div className="MetricIcon">📈</div>
                    <div className="MetricContent">
                        <h3>Gross Profit</h3>
                        <p className="MetricValue">${grossProfit.toFixed(2)}</p>
                        <span className="MetricSubtext">{profitMargin}% margin</span>
                    </div>
                </div>

                <div className="MetricCard inventory">
                    <div className="MetricIcon">📦</div>
                    <div className="MetricContent">
                        <h3>Total Products</h3>
                        <p className="MetricValue">{dashboardData.totalProducts}</p>
                        <span className="MetricSubtext">{dashboardData.totalPurchases} purchases</span>
                    </div>
                </div>

                <div className="MetricCard warning">
                    <div className="MetricIcon">⚠️</div>
                    <div className="MetricContent">
                        <h3>Low Stock Items</h3>
                        <p className="MetricValue">{dashboardData.lowStockProducts}</p>
                        <span className="MetricSubtext">Need reorder</span>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="DashboardColumns">
                {/* Left Column */}
                <div className="DashboardColumn">
                    {/* Top Selling Products */}
                    <div className="DashboardSection">
                        <h2>Top Selling Products</h2>
                        <div className="TopProductsList">
                            {dashboardData.topProducts.length > 0 ? (
                                dashboardData.topProducts.map((item, index) => (
                                    <div key={index} className="TopProductItem">
                                        <div className="TopProductRank">{index + 1}</div>
                                        <div className="TopProductInfo">
                                            <strong>
                                                {item.product?.product_name} - {item.product?.size} {item.product?.style}
                                            </strong>
                                            <span>{item.salesCount} sales</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="EmptyState">No sales data yet</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Sales */}
                    <div className="DashboardSection">
                        <div className="SectionHeader">
                            <h2>Recent Sales</h2>
                            <button onClick={() => navigate('/sales')} className="ViewAllButton">
                                View All →
                            </button>
                        </div>
                        <div className="RecentList">
                            {dashboardData.recentSales.length > 0 ? (
                                dashboardData.recentSales.map((sale) => (
                                    <div key={sale.id} className="RecentItem">
                                        <div className="RecentItemInfo">
                                            <strong>
                                                {sale.product?.product_name || `Product #${sale.product_id}`}
                                            </strong>
                                            <span className="RecentItemDetails">
                                                {sale.product?.size} {sale.product?.style}, {sale.product?.color}
                                            </span>
                                        </div>
                                        <div className="RecentItemAmount">${sale.sale_amount}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="EmptyState">No recent sales</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="DashboardColumn">
                    {/* Recent Purchases */}
                    <div className="DashboardSection">
                        <div className="SectionHeader">
                            <h2>Recent Purchases</h2>
                            <button onClick={() => navigate('/purchases')} className="ViewAllButton">
                                View All →
                            </button>
                        </div>
                        <div className="RecentList">
                            {dashboardData.recentPurchases.length > 0 ? (
                                dashboardData.recentPurchases.map((purchase) => (
                                    <div key={purchase.id} className="RecentItem">
                                        <div className="RecentItemInfo">
                                            <strong>
                                                {purchase.product?.product_name || `Product #${purchase.product_id}`}
                                            </strong>
                                            <span className="RecentItemDetails">
                                                Qty: {purchase.purchase_qty} @ ${(purchase.purchase_amount / purchase.purchase_qty).toFixed(2)}/unit
                                            </span>
                                        </div>
                                        <div className="RecentItemAmount">${purchase.purchase_amount}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="EmptyState">No recent purchases</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="DashboardSection">
                        <h2>Quick Actions</h2>
                        <div className="QuickActions">
                            <button onClick={() => navigate('/sales/new')} className="QuickActionButton sales">
                                + Add Sale
                            </button>
                            <button onClick={() => navigate('/purchases/new')} className="QuickActionButton purchases">
                                + Add Purchase
                            </button>
                            <button onClick={() => navigate('/products/new')} className="QuickActionButton products">
                                + Add Product
                            </button>
                            <button onClick={() => navigate('/products')} className="QuickActionButton view">
                                View Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;