import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import { Button, Form, Input, Select, Flex, Upload, message } from 'antd';
import { Table }
    from
    "antd"
    ;
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;


const Formwithantd = () => {
    const [form] = Form.useForm();
    const [UserArray, setUserArray] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [emailtoken, setEmailToken] = useState(false);
    // const [phonetoken, setphonetoken] = useState(false);
    // const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

        setFileList(info.fileList);
    };



    //For Submit is Sucessfull...........
    const onFinish = (values) => {
        //Add A new value Into values....
        const Totalvalues = {
            ...values,
            files: fileList[0]?.name || "No Files",
        };
        console.log(Totalvalues);

        const editEmail = UserArray.some((ele, index) =>
            ele.email === values.email
        );
        if (editEmail && (editIndex === null || UserArray[editIndex].email !== values.email)) {
            setEmailToken(true);
            return;
        } else {
            setEmailToken(false);
        }
        //File value saved into an other veriable...
        // const filesave = file;


        if (editIndex !== null) {
            // Update existing entry
            setUserArray(UserArray.map((item, index) =>
                index === editIndex ? { ...item, ...Totalvalues } : item
            ));
            setEditIndex(null);
        } else {
            //values store into an object.......
            console.log('Success:>>', values);
            console.log('Uploaded files:>>', fileList);
            console.log('Uploaded files name:>>', fileList[0]?.name);
            console.log("The Types of This values is=", typeof (values));
            setUserArray([...UserArray, Totalvalues]);
            console.log("The Array Value IS ", UserArray);
        }
        //Reset Form
        form.resetFields();
        // setFile(null);

    };

    useEffect(() => {
        if (emailtoken) {
            alert("These Email is Already Exit....... ")
        }
    }, [emailtoken])


    // useEffect(()=>{
    //     if(phonetoken) {
    //         alert("This Phone Number Is Already Exit...........")
    //     }
    // })

    //For Submit is Unsucessful.............
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    //For Table column.......
    const column = [
        {
            title: "SL No",
            key: "slno",
            render: (ele, element, index) => index + 1
        },
        {
            title: "Name",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "PhoneNumber",
            dataIndex: "phone",
            key: 'phone'
        },
        {
            title: "File",
            dataIndex: "files",
            key: "files",
            render: (file) => file ? file : "No files",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record, index) => (
                <div>
                    <Button style={{
                        marginRight: 20,
                        backgroundColor: 'yellow'
                    }}
                        onClick={() => handleEdit(index)}
                        type='dashed'>
                        Edit
                    </Button>

                    <Button style={{ backgroundColor: "red" }}
                        type='dashed'
                        onClick={() => handleDelect(index)}>
                        Delect
                    </Button>
                </div>
            )

        }
    ]
    //For Delect Row in the table..........
    const handleDelect = (index) => {
        // Remove the item at the specific index
        const updatedArray = UserArray.filter((_, indx) => indx !== index);
        setUserArray(updatedArray);
    };

    //For Edit Row in the Table...........

    const handleEdit = (index) => {
        //Here where the edit button is clicked on index number....
        console.log("The Edit Button Is Clicked On=", index);
        setEditIndex(index);
        form.setFieldsValue(UserArray[index]);
        // console.log(editIndex);
    }


    return (
        <div>
            <div style={{
                display: Flex,
                marginLeft: 500,
                alignItems: "center",
                textAlign: "center",
            }}>
                <Form form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"

                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="File_Upload">
                        <Input  type="file"  onChange={(e) => setFile(e.target.value)} />
                    </Form.Item> */}

                    <Form.Item
                        name="file"
                        label="File Upload"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e && e.fileList}
                        rules={[{ required: true, message: 'Please upload a file!' }]}
                    >
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onChange={handleChange}
                            showUploadList={{ showRemoveIcon: true }}
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        style={{
                            display: 'flex',
                            marginLeft: 140,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <div>
                    <h1>The User Details Shown Into A Table</h1>
                    <hr />
                </div>
                <div>
                    <Table dataSource={UserArray} columns={column} rowKey={(record, index) => index} />
                </div>
            </div>

        </div>

    )
};
export default Formwithantd;
