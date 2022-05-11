import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

import { UserContext } from "../../../contexts"

import OrderDetails from "../OrderDetails"

import { Grid, Chip, IconButton, Icon } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

import BackwardsIcon from "../../../images/BackwardsOutline"
import detailsIcon from "../../../images/details.svg"

import OrderHistoryStyles from "./OrderHistoryStyles"

export default function OrderHistory({ setSelectedSetting }) {
  const classes = OrderHistoryStyles()
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + "/orders/history", {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setOrders(response.data.orders)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const createData = data =>
    data.map(item => ({
      shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.zip} ${item.shippingAddress.city} ${item.shippingAddress.state}`,
      order: `#${item.id
        .slice(item.id.length - 10, item.id.length)
        .toUpperCase()}`,
      status: item.status,
      date: `${item.createdAt.split("-")[1]}/${
        item.createdAt.split("-")[2].split("T")[0]
      }/${item.createdAt.split("-")[0]}`,
      total: item.total,
      id: item.id,
    }))

  const columns = [
    { field: "shipping", headerName: "Shipping", flex: 1, sortable: false },
    { field: "order", headerName: "Order", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: "date", headerName: "Date", flex: 1, type: "date" },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    {
      field: "",
      flex: 1.5,
      sortable: false,
      renderCell: () => (
        <IconButton>
          <img src={detailsIcon} alt="order details" />
        </IconButton>
      ),
    },
  ]

  const rows = createData(orders)

  return (
    <Grid item container classes={{ root: classes.item }}>
      <Grid item classes={{ root: classes.header }}>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <div className={classes.icon}>
            <BackwardsIcon color="#fff" />
          </div>
        </IconButton>
      </Grid>
      <DataGrid
        hideFooterSelectedRowCount
        onRowClick={event => setOpen(event.row.id)}
        rows={rows}
        columns={columns}
        pageSize={5}
      />
      <OrderDetails open={open} setOpen={setOpen} />
    </Grid>
  )
}
