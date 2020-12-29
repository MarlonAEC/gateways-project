import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { list, reset } from '../../actions/gateways/list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

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

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     // if (this.props.match.params.page !== nextProps.match.params.page)
    //     //   nextProps.list();
    //   }
    
    

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
                                <th className="column-gateway">Serial Number</th>
                                <th className="column-gateway">Name</th>
                                <th className="column-gateway">IP Address</th>
                                <th className="column-gateway">Peripheral Devices</th>
                                <th className="column-gateway">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.retrieved &&
                                this.props.retrieved.map(item =>(
                                    <tr key={item['_id']} className="column-gateway">
                                        <td>
                                            <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                                {item['serialNumber']}
                                            </Link>
                                        </td>
                                        <td>{item['name']}</td>
                                        <td>{item['ipAddress']}</td>
                                        <td>{item['perDevices'].map(item2=>{
                                            return (
                                                <span key={item2['_id']}>
                                                    <Link to={`peripheral-devices/show/${encodeURIComponent(item2['_id'])}`}>
                                                        {item2['uid']}
                                                    </Link>
                                                    
                                                </span>
                                            )
                                        })}</td>
                                        <td>
                                            <span className="action-buttons">
                                                <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                </Link>
                                            </span>
                                            <span className="action-buttons">
                                                <Link to={`delete/${encodeURIComponent(item['_id'])}`}>
                                                    <FontAwesomeIcon icon={faTrash}/>
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
    } = state.gateways.list;
    return {retrieved, loading, error};
};

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);