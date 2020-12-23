import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { list, reset } from '../../actions/peripheral/list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class List extends Component {
    static propTypes = {
        retrieved: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        list: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.list();
    }

    render() {
        return (
            <div className="container">
                {this.props.loading && (
                    <div className="alert alert-info">Loading...</div>
                )}
                {this.props.deletedItem && (
                    <div className="alert alert-success">
                        {this.props.deletedItem['@id']} deleted.
                    </div>
                )}
                {this.props.error && (
                    <div className="alert alert-danger">{this.props.error}</div>
                )}

                <p>
                    <Link to="create" className="btn btn-primary">
                        Create
                    </Link>
                </p>

                <div className = "container gateways-table">
                    <table>
                        <thead className="table-head">
                            <tr className="container table-head-row">
                                <th className="column-gateway">UID</th>
                                <th className="column-gateway">Vendor</th>
                                <th className="column-gateway">Date</th>
                                <th className="column-gateway">Status</th>
                                <th className="column-gateway">
                                    Gateway
                                </th>
                                <th className="column-gateway">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.retrieved &&
                                this.props.retrieved.map(item =>(
                                    <tr key={item['_id']} className="column-gateway">
                                        <td>
                                            <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                                {item['uid']}
                                            </Link>
                                        </td>
                                        <td>{item['vendor']}</td>
                                        <td>{item['date']}</td>
                                        <td>{item['status']}</td>
                                        <td>
                                            <Link to={`/gateways/show/${encodeURIComponent(item['_id'])}`}>
                                                {item['gatewayId']}
                                            </Link>
                                        </td>
                                        <td>
                                            <span className="action-buttons">
                                                <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                                    SHOW
                                                </Link>
                                            </span>
                                            <span className="action-buttons">
                                                <Link to={`delete/${encodeURIComponent(item['_id'])}`}>
                                                    DELETE
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const{
        retrieved,
        loading,
        error
    } = state.peripherals.list;
    return {retrieved, loading, error};
};

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);