import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Link }                  from 'react-router';

import {
    Icon, 
    Row, 
    Col, 
    Popconfirm, 
    Table 
} from 'antd';

import requestCategoryList       from '../actions/category/requestCategoryList';
import changeCategoryStatus      from '../actions/category/changeCategoryStatus';
import Software                  from './Software';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/categoryManage.css';

/*
 * 管理后台，商品分类管理
 */
class CategoryManage extends Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state =  {
            columns: [
                {
                    title: 'Category Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Sorting',
                    dataIndex: 'sequence'
                },
                {
                    title: 'Create At',
                    dataIndex: 'createdAt'
                },
                {
                    title: 'Operation',
                    render: (text, record) => {
                        let openEnabled  = false;
                        let closeEnabled = false;
                        //1: 已开启
                        //2: 已关闭
                        if (record.status == 1) {
                            closeEnabled = true;
                        } else if (record.status == 2) {
                            openEnabled = true;
                        }
                        return (
                            <span>
                                <Link href={"#category/" + record.id}>
                                    <Icon type="eye"/>
                                    <span>View</span>
                                </Link>
                                <span className="ant-divider category-manage-divider" />
                                <Link href={"#category/edit/" + record.id}>
                                    <Icon type="edit"/>
                                    <span>Edit</span>
                                </Link>
                                <span className="ant-divider category-manage-divider" />
                                {
                                    openEnabled ?
                                    <Popconfirm title="Ensure to start?" okText="Yes" cancelText="Cancel"
                                        onConfirm={self.onMenuOpen.bind(self, record)}> 
                                        <a>
                                            <Icon type="arrow-up"/>
                                            <span>Start</span>
                                        </a>
                                    </Popconfirm>
                                    : 
                                    (
                                        closeEnabled ?
                                        <Popconfirm title="Ensure to Stop?" okText="Yes" cancelText="Cancel" 
                                            onConfirm={self.onMenuClose.bind(self, record)}>
                                            <a>
                                                <Icon type="arrow-down"/>
                                                <span>Stop</span>
                                            </a>
                                        </Popconfirm>
                                        : 
                                        null
                                    )
                                }
                            </span> 
                        );
                    }
                }
            ]
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestCategoryList());
        analyze.pv();
    }
    onMenuOpen(record) {
        const { dispatch } = this.props;
        //1: 已开启
        //2: 已关闭
        dispatch(changeCategoryStatus({
            id     : record.id,
            status : 1
        }));
    }
    onMenuClose(record) {
        const { dispatch } = this.props;
        //1: 已开启
        //2: 已关闭
        dispatch(changeCategoryStatus({
            id     : record.id,
            status : 2
        }));
    }
    render() {
        let { data }    = this.props;
        let { columns } = this.state;
        let isLoading   = data.categories.length > 0 ? false : true;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="category-list-box">
                            <div className="category-list-title">Product Categories List</div>
                            <Table rowKey="id" columns={columns} 
                                loading={isLoading} pagination={false}
                                dataSource={data.categories} bordered /> 
                        </div>
                    </Col>
                </Row>
                <Software />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.category
    };
}

export default connect(mapStateToProps)(CategoryManage);

