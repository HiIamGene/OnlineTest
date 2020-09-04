import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { setOptionOpen, setDeletePostOptionOpen, deleteFeedPost } from "../../../../redux/actions/feedAction";
import { withNamespaces } from "../../../../lib/i18n";
import axios from "axios";
import { API_FEED_POST } from "../../../../constant/ENV";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportPost: this.props.feed.post
        };
        this.deletePost = this.deletePost.bind(this);
    }
    async deletePost() {
        await axios.delete(`${API_FEED_POST}/${this.props.feed.post.id}`);
        this.props.deleteFeedPost(this.props.feed.post.id);
        this.props.setOptionOpen(true);
        this.props.setDeletePostOptionOpen(false);
    }

    toggle() {
        this.props.setDeletePostOptionOpen(!this.props.feed.isDeleteHasClick);
    }

    render() {
        return !this.props.feed.isOptionClose ? (
            <Modal isOpen={this.props.feed.isDeleteHasClick} fade={false} toggle={() => this.toggle()}>
                <ModalHeader toggle={() => this.toggle()}>{this.props.optionName}</ModalHeader>
                <ModalBody>{this.props.optionDetail}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.deletePost()}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        ) : (
            ""
        );
    }
}

const mapStateToProps = store => {
    return {
        feed: store.feedReducer
    };
};

export default compose(
    withNamespaces("timeline"),
    connect(
        mapStateToProps,
        { setOptionOpen, setDeletePostOptionOpen, deleteFeedPost }
    )
)(DeletePost);
