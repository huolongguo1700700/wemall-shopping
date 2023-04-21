import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Link }                  from 'react-router';

import { 
    Button,
    Icon, 
    Row, 
    Col, 
    Popconfirm, 
    Table 
} from 'antd';

import requestProductList        from '../actions/requestProductList';
import changeProductStatus       from '../actions/changeProductStatus';
import Software                  from './Software';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/productManage.css';

/*
 * 管理后台，商品管理
 */
class ProductManage extends Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state =  {
            columns: [
                {
                    title: 'Product Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Pageviews',
                    dataIndex: 'browseCount'
                },
                {
                    title: 'Purchase quantity',
                    dataIndex: 'buyCount'
                },
                {
                    title: 'Create At',
                    dataIndex: 'createdAt'
                },
                {
                    title: 'Sales',
                    dataIndex: 'totalSale'
                },
                {
                    title: 'Operation',
                    render: (text, record) => {
                        let upEnabled   = false;
                        let downEnabled = false;
                        //1: 商品已上架
                        //2: 商品已下架
                        //3: 商品未上架
                        if (record.status == 2 || record.status == 3) {
                            upEnabled = true;
                        } else if (record.status == 1) {
                            downEnabled = true;
                        }
                        return (
                            <span>
                                <a>
                                    <Icon type="eye"/>
                                    <span>View</span>
                                </a>
                                <span className="ant-divider product-manage-divider" />
                                <Link href={"#product/edit/" + record.id}>
                                    <Icon type="edit"/>
                                    <span>Edit</span>
                                </Link>
                                {
                                    upEnabled || downEnabled ?
                                    <span className="ant-divider product-manage-divider" />
                                    :
                                    null
                                }
                                {
                                    upEnabled ?
                                    <Popconfirm title="Ensure on shelf the product?" okText="Yes" cancelText="Cancel"
                                        onConfirm={self.onProductUp.bind(self, record)}> 
                                        <a>
                                            <Icon type="arrow-up"/>
                                            <span>On shelf</span>
                                        </a>
                                    </Popconfirm>
                                    : 
                                    (
                                        downEnabled ?
                                        <Popconfirm title="Ensure off shelf the product?" okText="Yes" cancelText="Cancel" 
                                            onConfirm={self.onProductDown.bind(self, record)}>
                                            <a>
                                                <Icon type="arrow-down"/>
                                                <span>Off shelf</span>
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
        dispatch(requestProductList());
        analyze.pv();
    }
    onProductUp(record) {
        const { dispatch } = this.props;
        //1: 商品已上架
        //2: 商品已下架
        //3: 商品未上架
        dispatch(changeProductStatus({
            id     : record.id,
            status : 1
        }));
    }
    onProductDown(record) {
        const { dispatch } = this.props;
        //1: 商品已上架
        //2: 商品已下架
        //3: 商品未上架
        dispatch(changeProductStatus({
            id     : record.id,
            status : 2
        }));
    }
    render() {
        let { data }    = this.props;
        let { columns } = this.state;
        let isLoading   = data.products.length > 0 ? false : true;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="product-list-box">
                            <div className="product-list-title">Product List
                                <ul className="action-group">
                                    <li>
                                        <Link href={"#product/add"}>
                                            <Button type="primary">Insert Product</Button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <Table rowKey="id" columns={columns} 
                                loading={isLoading} pagination={false}
                                dataSource={data.products} bordered /> 
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
        data: state.product
    };
}

export default connect(mapStateToProps)(ProductManage);

