import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Card, Col, FloatingLabel, Form } from 'react-bootstrap';
import { AiOutlineComment } from 'react-icons/ai';
import { createNewEmptyComment } from '../../helper/comment/createNewEmptyComment';
import { CREATE_COMMENT } from '../../services/api/comment/comment-mutations';
import { GET_ALL_COMMENTS_BY_TICKET } from '../../services/api/comment/comment-queries';
import { CreateCommentInput, GetAllCommentsByTicketQuery, MutationCreateCommentArgs } from '../../services/api/generated/graphql';
import { GET_PROFILE } from '../../services/api/user/user-queries';
import { JuraButton } from '../atomics/button/JuraButton';
import { CommentCard } from '../atomics/commentCard/CommentCard';
import { FormError } from '../atomics/form/formError/FormError';
import { Icon } from '../atomics/icon/Icon';
import { Loader } from '../atomics/loader/Loader';

export const CommentsThread = ({ ticketID }: any) => {
  const [newComment, setNewComment] = useState<CreateCommentInput>(createNewEmptyComment());

  const {
    error: commentError,
    loading: commentLoading,
    data: comments
  } = useQuery<GetAllCommentsByTicketQuery>(GET_ALL_COMMENTS_BY_TICKET, {
    variables: { getAllCommentsByTicketId: ticketID }
    // pollInterval: 1000
  });

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [createComment, { loading: createCommentLoading, error: createCommentError }] = useMutation<
    CreateCommentInput,
    MutationCreateCommentArgs
  >(CREATE_COMMENT, {
    refetchQueries: [GET_ALL_COMMENTS_BY_TICKET],
    variables: { ticketId: ticketID!, userId: userID!, commentInput: newComment },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => setNewComment(createNewEmptyComment())
  });

  const onChange = (e: any) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  return (
    <Col sm={12} md={12} className="d-flex flex-column justify-content-center align-items-center">
      <Card className="comments-thread">
        <Card.Title style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', margin: '1rem' }}>
          <Icon
            id="comments"
            icon={<AiOutlineComment />}
            color={comments && comments?.getAllCommentsByTicket?.length > 0 ? 'red' : ''}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
          <Card.Text style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>{comments?.getAllCommentsByTicket?.length}</Card.Text>
        </Card.Title>
        <Card.Body className="comments-list">
          {comments &&
            comments.getAllCommentsByTicket?.map((comment: any) => {
              return (
                <div
                  key={comment.id}
                  className={comment.user.id === userID ? 'comment-card-container-mine' : 'comment-card-container-others'}
                >
                  {comment.user.id !== userID && (
                    <div className="comment-user-circle">
                      <span className="comment-user-initials">{comment.user.firstname.charAt(0)}</span>
                      <span className="comment-user-initials">{comment.user.lastname.charAt(0)}</span>
                    </div>
                  )}
                  <CommentCard comment={comment} />
                </div>
              );
            })}
          {commentLoading && <Loader message="Chargement des commentaires..." />}
          {commentError && <FormError error={commentError} message="Une erreur s'est produite!" />}
        </Card.Body>
        <Card.Footer style={{ fontSize: '1rem', textAlign: 'center' }}>
          <Form noValidate>
            <FloatingLabel controlId="floatingInput" label="Nouveau commentaire" className="mb-10">
              <Form.Control as="textarea" style={{ marginBottom: '1rem' }} value={newComment.text} name="text" onChange={onChange} />
            </FloatingLabel>
            <JuraButton
              parentId="comment"
              type="button"
              variant="primary"
              title="Envoyer"
              onClick={createComment}
              disabled={!newComment.text}
            />
          </Form>
          {createCommentError && <FormError error={createCommentError} message="Une erreur s'est produite!" />}
          {createCommentLoading && <Loader message="Envoi du commentaire..." />}
        </Card.Footer>
      </Card>
    </Col>
  );
};
