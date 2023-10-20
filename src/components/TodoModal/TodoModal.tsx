import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type TodoModalprops = {
  todo: Todo | null;
  onVisible: () => void;
};

export const TodoModal: React.FC<TodoModalprops> = (
  { todo, onVisible },
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      setIsLoading(true);
      getUser(todo.userId)
        .then(fetchedUser => {
          setUser(fetchedUser);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {todo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close modal"
              onClick={onVisible}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
