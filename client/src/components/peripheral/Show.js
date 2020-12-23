import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {show, reset} from '../../actions/peripheral/show';
import { del } from '../../actions/peripheral/delete';
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
                    <h1>Information about Peripheral Device:</h1> <span>{item && item['serialNumber']}</span>
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
                        <h3>Peripheral Device ID:</h3> <span>{item['_id']}</span>
                        <h3>UID:</h3> <span>{item['uid']}</span>
                        <h3>Vendor:</h3> <span>{item['vendor']}</span>
                        <h3>Status</h3> <span>{item['status']}</span>
                        <h3>Date created: </h3><span>{item['date']}</span>
                    </div>
                )}
                        

                <Link to="/peripheral-devices/list" className="btn btn-primary">
                    Back to list
                </Link>
                {/* {item && (
                <Link to={`/peripheral-devices/edit/${encodeURIComponent(item['_id'])}`}>
                    <button className="btn btn-warning">Edit</button>
                </Link>
                )} */}
                <button onClick={this.del} className="btn btn-danger">
                    Delete
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    retrieved: state.peripherals.show.retrieved,
    error: state.peripherals.show.error,
    loading: state.peripherals.show.loading,
    eventSource: state.peripherals.show.eventSource,
    deleteError: state.peripherals.del.error,
    deleteLoading: state.peripherals.del.loading,
    deleted: state.peripherals.del.deleted
  });
  
  const mapDispatchToProps = dispatch => ({
    show: id => dispatch(show(id)),
    del: item => dispatch(del(item)),
    reset: eventSource => dispatch(reset(eventSource))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Show);