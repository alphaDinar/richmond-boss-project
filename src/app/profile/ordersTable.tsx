"use client";
import React, { FC } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { cedi } from "@/external/assets";
import Link from "next/link";
import { MdOutlineNorthEast } from "react-icons/md";
import { Order } from "@/types/order";
import Image from "next/image";
import { getRealDate } from "@/external/time";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type OrderTableProps = {
  orders: Order[]
};
export const OrdersTable: FC<OrderTableProps> = ({ orders }) => {
  // const renderCell = React.useCallback((user, columnKey) => {
  //   const cellValue = user[columnKey];

  //   switch (columnKey) {
  //     case "name":
  //       return (
  //         <User
  //           avatarProps={{ radius: "lg", src: user.avatar }}
  //           description={user.email}
  //           name={cellValue}
  //         >
  //           {user.email}
  //         </User>
  //       );
  //     case "role":
  //       return (
  //         <div className="flex flex-col">
  //           <p className="text-bold text-sm capitalize">{cellValue}</p>
  //           <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
  //         </div>
  //       );
  //     case "status":
  //       return (
  //         <Chip className="capitalize" color='danger' size="sm" variant="flat">
  //           {cellValue}
  //         </Chip>
  //       );
  //     case "actions":
  //       return (
  //         <div className="relative flex items-center gap-2">
  //           <Tooltip content="Details">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EyeIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip content="Edit user">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EditIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip color="danger" content="Delete user">
  //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //               <DeleteIcon />
  //             </span>
  //           </Tooltip>
  //         </div>
  //       );
  //     default:
  //       return cellValue;
  //   }
  // }, []);

  return (
    <Table aria-label="Example table with custom cells" className="overflow-auto" removeWrapper border={0} shadow="none" radius="none">
      <TableHeader>
        <TableColumn align={"start"} colSpan={1}>
          OID
        </TableColumn>
        <TableColumn align={"start"} colSpan={1}>
          Date
        </TableColumn>
        <TableColumn align={"start"}>
          Total
        </TableColumn>
        <TableColumn align={"start"}>
          Payment
        </TableColumn>
        <TableColumn align={"start"}>
          {''}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order, i) => (
          <TableRow as={Link} href="/" key={i} className="cursor-pointer">
            <TableCell>
              <section className="flex gap-3 items-center">
                <div className="w-10 h-10 relative sm-screen:h-6 sm-screen:w-6">
                  <Image alt="" src={order.items[0].img} fill sizes="auto" objectFit="contain" />
                </div>
                <article className="flex flex-col">
                  <span>Oid01291209309</span>
                  <small>{order.items.length > 1 && `+ ${order.items.length - 1} items`}</small>
                </article>
              </section>
            </TableCell>
            <TableCell>
              <span className="w-96 text-nowrap">{getRealDate(order.timestamp)}</span>
            </TableCell>
            <TableCell>
              <span className="text-nowrap">{cedi} {order.total.toLocaleString()}</span>
            </TableCell>
            <TableCell>
              <Chip className="capitalize" color='danger' size="sm" variant="flat">
                Offline
              </Chip>
            </TableCell>
            <TableCell>
              <MdOutlineNorthEast />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
