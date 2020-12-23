import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { del } from '../../actions/gateways/delete';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Erase extends Component {
    static propTypes = {
        del: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        error: PropTypes.string,
        deleted: PropTypes.object
    }

    componentDidMount(){
        this.props.del(decodeURIComponent(this.props.match.params.id))
    }

    render() {
        return (
           <div>
                {
                    this.props.deleted && (
                        <Redirect to="/gateways/list" />
                    )
                }{
                    this.props.error &&(
                        <div className="alert alert-danger">{this.props.error}</div>
                    )   
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const{
        deleted,
        loading,
        error
    } = state.gateways.del;
    return {deleted, loading, error};
}

const mapDispatchToProps = dispatch => ({
    del: page => dispatch(del(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Erase);