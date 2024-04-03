"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  getKeyValue,
  Chip,
  Tooltip,
  User,
  Pagination,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/app/icon";
import client from "@/service/request";
import axios from "axios";
import { PriceFeed } from "@/types";

const columns = [
  {
    key: "pair",
    label: "pair",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "percentChange24h",
    label: "percentChange24h",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function Market() {
  const [data, setData] = useState<PriceFeed[]>([]);
  const [page, setPage] = useState<number>(1);
  const rowPerPage = 10;
  const pages = Math.ceil(data.length / rowPerPage);

  console.log({ pages, data });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowPerPage;
    const end = start + rowPerPage;

    return data.slice(start, end);
  }, [page, data]);
  const fetchPrice = async () => {
    const res = await axios.get("https://api.gemini.com/v1/pricefeed");
    if (res.status === 200) {
      console.log("data ", res.data);
      setData(res.data);
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchPrice();
    }, 2000);
  }, []);

  const renderCell = React.useCallback(
    (row: PriceFeed, columnKey: React.Key) => {
      const cellValue = row[columnKey as keyof PriceFeed];
      switch (columnKey) {
        case "action":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "percentChange24h": {
        }
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <>
      <div className="flex flex-col ">
        <div className="grid grid-cols-4 gap-4 p-2 mt-2">
          <div>
            <Card>
              <CardBody>
                <p>1</p>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardBody>
                <p>2</p>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardBody>
                <p>3</p>
              </CardBody>
            </Card>
          </div>
          <div>
            <Card>
              <CardBody>
                <p>4</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="text-center ">
        <Table
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.pair}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
