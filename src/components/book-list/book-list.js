import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
//import { bindActionCreators } from "redux";

import { withBookstoreService } from "../hoc";
//import { booksLoaded, booksRequested, booksError } from "../../actions";
import { fetchBooks, bookAddedToCart } from "../../actions";

import { compose } from "../../utils";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

// const mapStateToProps = (state) => {
//   return { books: state.books, loading: state.loading };
// };
const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return { books, loading, error };
};

// const mapDispatchToProps = (dispacth) => {
//   return bindActionCreators({ booksLoaded }, dispacth);

// //   return {
// //     booksLoaded: (newBooks) => {
// //       dispacth(booksLoaded(newBooks));
// //     },
// //   };
// };

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError,
// };

// const mapDispatchToProps = (dispacth, ownProps) => {
//   const { bookstoreService } = ownProps;
//   return {
//     fetchBooks: () => {
//       dispacth(booksRequested());
//       bookstoreService
//         .getBooks()
//         .then((data) => dispacth(booksLoaded(data)))
//         .catch((err) => dispacth(booksError(err)));
//     },
//   };
// };

const mapDispatchToProps = (dispacth, ownProps) => {
  return {
    fetchBooks: fetchBooks(ownProps.bookstoreService, dispacth),
    onAddedToCart: (id) => dispacth(bookAddedToCart(id)),
  };
};

// export default withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList)
// );
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
