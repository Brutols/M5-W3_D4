import { useDispatch, useSelector } from "react-redux";
import { isSelected } from "../../Reducers/bookReducer/bookSlice";
import {
  allComments,
  getComments,
  handleError,
  isAllCommentsError,
} from "../../Reducers/commentsReducer/commentsSlice";
import { useEffect } from "react";
import SingleComment from "../SingleComment/SingleComment";

const CommentsList = () => {
  const dispatch = useDispatch();
  const selected = useSelector(isSelected);
  const comments = useSelector(allComments);
  const error = useSelector(isAllCommentsError);

  useEffect(() => {
    if (selected) {
      dispatch(getComments(selected));
    } else {
      dispatch(
        handleError({ value: "Click on a card to show it's comments!" })
      );
    }
  }, [selected, dispatch]);

  return (
    <>
      {selected ? (
        comments.map((comment, i) => {
          return (
            <SingleComment
              key={i}
              text={comment.comment}
              rating={comment.rate}
              user={comment.author}
            />
          );
        })
      ) : (
        <h1 className="font-bold text-lg"> {error} </h1>
      )}
    </>
  );
};

export default CommentsList;
