'use client';
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Avatar,
  styled,
  alpha,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Inventory2 as ProductIcon,
  Category as CategoryIcon,
  AttachMoney as PriceIcon,
  CalendarToday as DateIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// Styled components for enhanced appearance
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  borderRadius: theme.spacing(2),
  '& .MuiDataGrid-main': {
    borderRadius: theme.spacing(2),
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    '& .MuiDataGrid-columnHeader': {
      '&:focus, &:focus-within': {
        outline: 'none',
      },
    },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
    '&:focus, &:focus-within': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      cursor: 'pointer',
    },
    '&:nth-of-type(even)': {
      backgroundColor: alpha(theme.palette.grey[50], 0.5),
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    backgroundColor: alpha(theme.palette.grey[50], 0.5),
  },
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[8],
}));

const StatsChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.2),
  color: 'white',
  fontWeight: 'bold',
  '& .MuiChip-icon': {
    color: 'white',
  },
}));

// Price formatter function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price);
};

// Date formatter function
const formatDate = (dateString: string) => {
  if (!dateString || dateString === "0000-00-00 00:00:00") return "N/A";
  try {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return "N/A";
  }
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/products");
      const data = await res.json();
      console.log("Fetched products:", data);

      // กรองเฉพาะ object ที่มี id
      const filtered = data.filter((item: any) => item?.id != null);
      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
            #
          </Avatar>
          ID
        </Box>
      ),
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: "pro_name",
      headerName: "Product Name",
      width: 250,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ProductIcon sx={{ fontSize: 20 }} />
          Product Name
        </Box>
      ),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            {params.value?.charAt(0)?.toUpperCase() || 'P'}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PriceIcon sx={{ fontSize: 20 }} />
          Price
        </Box>
      ),
      renderCell: (params) => (
        <Chip
          label={formatPrice(params.value)}
          size="small"
          sx={{
            bgcolor: 'success.light',
            color: 'success.contrastText',
            fontWeight: 'bold',
          }}
        />
      ),
    },
    {
      field: "cat_name",
      headerName: "Category",
      width: 180,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CategoryIcon sx={{ fontSize: 20 }} />
          Category
        </Box>
      ),
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="info"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      field: "created_date",
      headerName: "Created Date",
      width: 200,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DateIcon sx={{ fontSize: 20 }} />
          Created Date
        </Box>
      ),
      valueGetter: (params: any) =>
        params?.row?.created_date && params.row.created_date !== "0000-00-00 00:00:00"
          ? params.row.created_date
          : "N/A",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: "updated_date",
      headerName: "Updated Date",
      width: 200,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DateIcon sx={{ fontSize: 20 }} />
          Updated Date
        </Box>
      ),
      valueGetter: (params: any) =>
        params?.row?.updated_date && params.row.updated_date !== "0000-00-00 00:00:00"
          ? params.row.updated_date
          : "N/A",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section */}
      <HeaderCard>
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                📦 All Products
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage and view all your products in one place
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <StatsChip
                icon={<ProductIcon />}
                label={`${products.length} Products`}
                size="medium"
              />
              <Tooltip title="Refresh Data">
                <IconButton 
                  onClick={fetchProducts} 
                  sx={{ 
                    color: 'white', 
                    bgcolor: alpha('#fff', 0.2),
                    '&:hover': { bgcolor: alpha('#fff', 0.3) }
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </HeaderCard>

      {/* Table Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        {loading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: 400,
              flexDirection: 'column',
              gap: 2
            }}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" color="text.secondary">
              Loading products...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ height: 650, width: "100%" }}>
            <StyledDataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 15, page: 0 },
                },
              }}
              pageSizeOptions={[10, 15, 25, 50]}
              disableRowSelectionOnClick
              checkboxSelection={false}
              density="comfortable"
              sx={{
                '& .MuiDataGrid-pagination': {
                  color: 'primary.main',
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AllProducts;