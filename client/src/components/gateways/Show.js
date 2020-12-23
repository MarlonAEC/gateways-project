import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {show, reset} from '../../actions/gateways/show';
import { del } from '../../actions/gateways/delete';
import { connect } from 'react-redux';

class Show extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        eventSource: PropTypes.instanceOf(EventSource),
        show: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        deleteError: PropTypes.string,
        deleteLoading: PropTypes.bool.isRequired,
        deleted: PropTypes.object,
        del: PropTypes.func.isRequired
    };

    componentDidMount() {
       this.props.show(decodeURIComponent(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.reset(this.props.eventSource);
    }

    del = () => {
        if (window.confirm('Are you sure you want to delete this item?'))
          this.props.del(this.props.retrieved['_id']);
      };
      
    render() {
        const item = this.props.retrieved;
        return (
            <div className = "container">
                <header className="class-header">
                    <h1>Information about Gateway:</h1> <span>{item && item['serialNumber']}</span>
                </header>
                {this.props.loading && (
                    <div className="alert alert-info">Loading...</div>
                )}
                {this.props.deletedItem && (
                    <div className="alert alert-success">
                        {this.props.deletedItem['_id']} deleted.
                    </div>
                )}
                {this.props.error && (
                    <div className="alert alert-danger">{this.props.error}</div>
                )}
                
                {item && (
                    <div className="container">
                        <h3>Gateway ID:</h3> <span>{item['_id']}</span>
                        <h3>Serial Number:</h3> <span>{item['serialNumber']}</span>
                        <h3>Human readable name:</h3> <span>{item['name']}</span>
                        <h3>IPv4 Addres of the gateway</h3> <span>{item['ipAddress']}</span>
                        <h3>Peripheral devices: </h3>
                        <div className="container gateways-table">
                            <table>
                                <thead className="table-head">
                                    <tr className="container table-head-row">
                                        <th className="column-gateway">UID</th>
                                        <th className="column-gateway">Vendor</th>
                                        <th className="column-gateway">Date</th>
                                        <th className="column-gateway">Status</th>
                                        <th className="column-gateway">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        item['perDevices'].map(item2 => {
                                            return(
                                                <tr key={item2['_id']} className="column-gateway">
                                                    <td>
                                                        <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                                            {item2['uid']}
                                                        </Link>
                                                    </td>
                                                    <td>{item2['vendor']}</td>
                                                    <td>{item2['date']}</td>
                                                    <td>{item2['status']}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                        

                <Link to="/gateways/list" className="btn btn-primary">
                    Back to list
                </Link>
                {item && (
                <Link to={`/turnos/edit/${encodeURIComponent(item['@id'])}`}>
                    <button className="btn btn-warning">Edit</button>
                </Link>
                )}
                <button onClick={this.del} className="btn btn-danger">
                    Delete
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    retrieved: state.gateways.show.retrieved,
    error: state.gateways.show.error,
    loading: state.gateways.show.loading,
    eventSource: state.gateways.show.eventSource,
    deleteError: state.gateways.del.error,
    deleteLoading: state.gateways.del.loading,
    deleted: state.gateways.del.deleted
  });
  
  const mapDispatchToProps = dispatch => ({
    show: id => dispatch(show(id)),
    del: item => dispatch(del(item)),
    reset: eventSource => dispatch(reset(eventSource))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Show);