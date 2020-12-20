import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { list, reset } from '../../actions/gateways/list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class List extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
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
            <div>
                <h2>Gateway List</h2>
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

                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Name</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.retrieved &&
                            this.props.retrieved.map(item =>(
                                <tr key={item['_id']}>
                                    <th scope="row">
                                        <Link to={`show/${encodeURIComponent(item['_id'])}`}>
                                            {item['nombre']}
                                        </Link>
                                    </th>
                                    <td>{item['serialNumber']}</td>
                                    <td>{item['name']}</td>
                                    <td>{item['ipAddress']}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

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