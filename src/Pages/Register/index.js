import React,{useState} from "react"; 
import { vsmAuth, vsmNotify } from "../../Config/messages";
import { Card, Form, Input, Button, Alert, Popover } from "antd";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
    const [isError, setIsError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [form] = Form.useForm();

    let history = useHistory();

    // make function call to register
    const handleSubmit = (data) => {
        setLoading(true);
        let registeredUserList = JSON.parse(localStorage.getItem('registeredUserList'));

         let checkUser =
         registeredUserList?.length > 0 &&
         registeredUserList.find((item) => item.email === data.email);
        if (checkUser) {
            setLoading(false);
            vsmNotify.error({
                message: 'Already exists ',
            });
            setIsError('Already exists ')
        } else {
            setLoading(false);
            
            let arr = [];
            if(registeredUserList){
                arr = [...registeredUserList,data]
            }else{
                arr.push(data);
            }
            localStorage.setItem('registeredUserList',JSON.stringify(arr));
        
            vsmNotify.success({
                message: vsmAuth.successRegister,
            }); 
            history.push("/");
        }
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

    return (
        <div className="common__wrapper">
        <Form form={form} className="w400" onFinish={handleSubmit}>
          <Card title="Sign Up">
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
            <Form.Item
              name="confirm_password"
              rules={vsmAuth.validation.confirmpassword}
              hasFeedback
            >
              <Input.Password
                placeholder="Confirm Password"
                onBlur={() => setTooltip(false)}
                onChange={handleChangePassword}
              />
            </Form.Item>
            <div className="text-center">
              <Button loading={loading} htmlType="submit" block type="primary">
                SIGN UP
              </Button>
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/" type="link" className="p-0 mt-10">
                <b>Login</b>
              </Link>
            </div>
          </Card>
        </Form>
      </div>
    );
};

export default Register;