import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, ButtonToolbar, Card, Form, OverlayTrigger } from 'react-bootstrap';
import { GrSend, GrUpdate } from 'react-icons/gr';
import { RiArrowGoBackLine, RiDeleteBin5Line } from 'react-icons/ri';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { DELETE_COMMENT, UPDATE_COMMENT } from '../../../services/api/comment/comment-mutations';
import { GET_ALL_COMMENTS_BY_TICKET } from '../../../services/api/comment/comment-queries';
import { Comment, MutationDeleteCommentArgs, MutationUpdateCommentArgs } from '../../../services/api/generated/graphql';
import { GET_PROFILE } from '../../../services/api/user/user-queries';
import { Link } from '../link/Link';

export interface CommentCardProps {
  comment: Partial<Comment>;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const cardId = `commentCard-${comment.id}`;

  const [update, setUpdate] = useState(false);
  const [updatedComment, setUpdateComment] = useState(comment?.text);

  const { error: errorProfile, loading: profileLoading, data: profile } = useQuery(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [updateComment, updateState] = useMutation<MutationUpdateCommentArgs>(UPDATE_COMMENT);

  const onChange = (e: any) => {
    setUpdateComment(e.target.value);
  };

  const updateTheComment = (commentId: string) => {
    updateComment({
      variables: {
        commentInput: {
          id: commentId,
          text: updatedComment
        }
      },
      refetchQueries: [GET_ALL_COMMENTS_BY_TICKET]
    });
    setUpdate(false);
  };

  const [removeComment, deleteState] = useMutation<MutationDeleteCommentArgs>(DELETE_COMMENT);

  const deleteComment = (commentId: string) => {
    removeComment({
      variables: { deleteCommentId: commentId },
      refetchQueries: [GET_ALL_COMMENTS_BY_TICKET]
    });
  };

  return (
    <Card
      data-testid={cardId}
      className={comment?.user?.id === userID ? 'comment-card-mine' : 'comment-card-others'}
      style={{ minWidth: '15rem', maxWidth: '30rem', margin: '1rem' }}
    >
      <Card.Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem'
        }}
      >
        <Card.Text
          data-testid={`${cardId}-user`}
          style={{ display: 'flex', flexDirection: 'row', marginBottom: '0rem', justifyContent: 'space-between' }}
        >
          <Link
            data-testid={`${cardId}-link`}
            to={`/users/${comment?.user?.id}`}
            title={`${comment?.user?.firstname} ${comment?.user?.lastname}`}
          />
        </Card.Text>
        {!update && comment?.user?.id === userID && (
          <ButtonToolbar>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('supprimer')}>
              <Button
                data-testid={`${cardId}-delete-button`}
                className="mx-1"
                variant="outline-danger"
                size="sm"
                onClick={() => deleteComment(comment.id as string)}
              >
                <RiDeleteBin5Line style={{ color: 'black' }} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('mettre à jour')}>
              <Button
                data-testid={`${cardId}-update-button`}
                className="mx-0"
                variant="outline-success"
                size="sm"
                onClick={() => setUpdate(true)}
              >
                <GrUpdate />
              </Button>
            </OverlayTrigger>
          </ButtonToolbar>
        )}
      </Card.Header>
      {!update && (
        <>
          <Card.Body>
            <Card.Text data-testid={`${cardId}-created-date`} style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
              {new Date(comment?.created_date).toLocaleString('fr-FR')}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-text`}>{comment?.text}</Card.Text>
          </Card.Body>
          {comment?.created_date !== comment?.updated_date && (
            <Card.Text
              style={{ fontSize: '0.65rem', fontStyle: 'italic', textAlign: 'right', marginBottom: '0.25rem', marginRight: '0.5rem' }}
            >
              mise à jour : {new Date(comment?.updated_date).toLocaleString('fr-FR')}
            </Card.Text>
          )}
        </>
      )}
      {update && (
        <>
          <Card.Body>
            <Form.Control as="textarea" style={{ maxWidth: '30rem' }} value={updatedComment} name="text" onChange={onChange} />
          </Card.Body>
          <Card.Footer>
            <ButtonToolbar>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
                <Button className="mx-0" variant="outline-primary" size="sm" onClick={() => updateTheComment(comment.id as string)}>
                  <GrSend />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('annuler')}>
                <Button className="mx-2" variant="outline-danger" size="sm" onClick={() => setUpdate(false)}>
                  <RiArrowGoBackLine style={{ color: 'black' }} />
                </Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </Card.Footer>
        </>
      )}
    </Card>
  );
};
