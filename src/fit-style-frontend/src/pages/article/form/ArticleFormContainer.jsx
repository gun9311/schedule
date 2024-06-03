import React, { Component } from "react";
import ArticleForm from "./ArticleForm";
import isEmpty from "validator/es/lib/isEmpty";
// import ToastMessages from "../../../components/toastmessages/ToastMessages";
// import { TOP_RIGHT } from "../../../config/consts/ToastPosition";
// import ImgConvert from "../../../utils/RequestCreate";
import trim from "validator/es/lib/trim";
// import { news } from "../../../packages/api";

class ArticleFormContainer extends Component {
  state = {
    articleData: {
      header: "",
      content: "",
      dateTime: "",
      imageData: null,
    },
    message: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      articleData: {
        ...this.state.articleData,
        [name]: value,
      },
    });
  };

  handleImgInputChange = (event) => {
    const { files } = event.target;
    this.setState({
      articleData: {
        ...this.state.articleData,
        imageData: files[0],
      },
    });
  };

  handleAdd = async (event) => {
    event.preventDefault();

    if (
      isEmpty(trim(this.state.articleData.header)) ||
      isEmpty(trim(this.state.articleData.content))
    ) {
      const errorMsg = "Заполните поля";
      this.setState({
        message: errorMsg,
      });
      return;
    }
    if (this.state.articleData.content.length > 1500) {
      this.setState({
        message: "В описании должно быть меньше 1500 символов",
      });
      return;
    }
    if (this.state.articleData.header.length > 50) {
      this.setState({
        message: "В заголовке должно быть меньше 50 символов",
      });
      return;
    }

    await this.setState({
      articleData: {
        ...this.state.articleData,
        dateTime: new Date(),
      },
    });

    // const data = ImgConvert.createRequestData(
    //   this.state.articleData,
    //   this.state.articleData.imageData
    // );
    // article
    //   .addArticle(data)
    //   .then((response) => {
    //     this.setState({
    //         articleData: {
    //         header: "",
    //         content: "",
    //         dateTime: "",
    //         imageData: null,
    //       },
    //       message: "",
    //     });
    //     ToastMessages.success("Новость успешно добавлена!", TOP_RIGHT);
    //     this.props.setActive(false);
    //     this.props.updateNews();
    //   })
    //   .catch((error) => {
    //     let errorMsg = error.response?.data?.message || error.message;

    //     this.setState({
    //       message: errorMsg,
    //     });
    //   });
  };

  render() {
    return (
      <ArticleForm
        handleFunc={{
          add: this.handleAdd,
          input: this.handleInputChange,
          inputImg: this.handleImgInputChange,
        }}
        value={this.state.articleData}
        message={this.state.message}
      />
    );
  }
}

export default ArticleFormContainer;
