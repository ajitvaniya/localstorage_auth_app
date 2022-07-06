import React, {  useState,useEffect } from "react";
import { Card, Form, Input, Button, Alert, Popover } from "antd";
import { Link, useHistory } from "react-router-dom";
import { vsmAuth, vsmNotify } from "../../Config/messages";

const Login = () => {
    const [isError, setIsError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tooltip, setTooltip] = useState(false);

    let history = useHistory();
    const [form] = Form.useForm();

    const handleSubmit =(data)=>{
        const userList = JSON.parse(localStorage.getItem('registeredUserList'));
        let checkUser =
        userList?.length > 0 &&
        userList.find(
            (item) => item.email === data.email && item.password === data.password
        );
        if (userList?.length > 0 && checkUser) {
            localStorage.setItem('authUser',JSON.stringify(checkUser));
            
            vsmNotify.success({
                message: vsmAuth.success,
            });
            history.push("/dashboard");
        } else {
            vsmNotify.error({
                message:'User Not Found',
            });
        }
    }

    // handle password tool tip visiblility
    const handleChangePassword = (e) => {
        form
        .validateFields(["password"])
        .then(() => {
            setTooltip(false);
        })
        .catch(() => {
            setTooltip(true);
        });
    };
    // password criteria tool tip
    const passwordTooltip = (
        <div>
        <div>at least 1 numeric character</div>
        <div>at least 1 special character</div>
        <div>at least 1 uppercase letter</div>
        <div>at least 8 character</div>
        </div>
    );


    useEffect(() => {
         form.resetFields();
    }, [form]);
     
    return (
        <div className="common__wrapper">
            <Form form={form} className="w400" onFinish={handleSubmit}>
                <Card title="Login">
                    {isError && (
                        <Alert
                        style={{ marginBottom: 15 }}
                        message={isError}
                        type="error"
                        showIcon
                        />
                    )}
                    <Form.Item name="email" rules={vsmAuth.validation.email} hasFeedback>
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Popover
                        placement="topRight"
                        content={passwordTooltip}
                        visible={tooltip}
                    >
                        <Form.Item
                        name="password"
                        rules={vsmAuth.validation.password}
                        hasFeedback
                        >
                        <Input.Password
                            placeholder="Password"
                            onBlur={() => setTooltip(false)}
                            onChange={handleChangePassword}
                            onFocus={handleChangePassword}
                        />
                        </Form.Item>
                    </Popover>
                    <div className="text-center">
                        <Button loading={loading} htmlType="submit" block type="primary">
                        LOGIN
                        </Button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/register" type="link" className="p-0 mt-10">
                        <b>Sign Up</b>
                        </Link>
                    </div>
                </Card>
            </Form>
        </div>
    );
};

export default Login;