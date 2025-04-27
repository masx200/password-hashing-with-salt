import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];
// @ts-ignore
const App: React.FC = function () {
  // @ts-ignore
  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default qwikify$(App);
