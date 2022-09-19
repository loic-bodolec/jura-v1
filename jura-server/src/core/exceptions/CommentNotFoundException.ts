import { NotFoundException } from './NotFoundException';

class CommentNotFoundException extends NotFoundException {
  constructor() {
    super('Comment');
  }
}

export default CommentNotFoundException;
