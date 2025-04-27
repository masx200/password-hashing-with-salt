//@ts-nocheck
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
export interface DataType {
  key: string;
  name: string;
  value: string;
}

//@ts-nocheck
// @ts-ignore
const App: React.FC<{
  columns: TableProps<DataType>["columns"];
  dataSource: DataType[];
}> = function (columns: TableProps<DataType>["columns"], dataSource: DataType[]) {
  // @ts-ignore
  return (
    <div className="css-var-«r6» ant-table-css-var ant-table-wrapper">
      <Table<DataType> columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default qwikify$(App);
