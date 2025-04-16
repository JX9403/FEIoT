import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";

const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    // console.log(values);
    let query = "";
    //build query
    if (values.filterValue) {
      query += `&filterValue=${values.filterValue}`;
    }
    if (values.filterType) {
      query += `&filterType=${values.filterType}`;
    }

    // console.log("check query", query);

    if (query) {
      // console.log(query);
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name={`filterValue`} label={`Filter Number`}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name={`filterType`} label={`Filter Type`}>
            <Select defaultValue="all">
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="createdAt">Time</Select.Option>
              <Select.Option value="temperature">Temperature</Select.Option>
              <Select.Option value="humidity">Humidity</Select.Option>
              <Select.Option value="light">Light</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
