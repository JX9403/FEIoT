import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Popconfirm,
  Button,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { render } from "react-dom";
import moment from "moment";
import { fakeHistoryData } from "../../../fakeData";

// https://stackblitz.com/run?file=demo.tsx
const History = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-createdAt");

  // useEffect(() => {
  //   fetchBook();
  // }, [current, pageSize, filter, sortQuery]);

  // const fetchBook = async () => {
  //   setIsLoading(true);
  //   let query = `?current=${current}&pageSize=${pageSize}`;
  //   if (filter) {
  //     query += `${filter}`;
  //   }
  //   if (sortQuery) {
  //     query += `&${sortQuery}`;
  //   }
  //   // console.log("query<<", query);
  //   const res = await getListBook(query);
  //   if (res && res.data) {
  //     setListBook(res.data.result);
  //     setTotal(res.data.meta.total);
  //   }
  //   setIsLoading(false);
  // };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            // onClick={() => {
            //   // console.log(record);
            //   setDataViewDetail(record);
            //   setOpenViewDetail(true);
            // }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Device",
      dataIndex: "device",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      sorter: true,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      sorter: true,
      render: (text, record, index) => {
        return (
          <span>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</span>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>History Device</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    );
  };

  const handleSearch = (query) => {
    console.log("input query", query);
    setFilter(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            loading={false}
            columns={columns}
            dataSource={fakeHistoryData}
            onChange={onChange}
            rowKey="_id"
            pagination={{
              current: 1,
              pageSize: 5,
              showSizeChanger: true,
              total: 20,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default History;
