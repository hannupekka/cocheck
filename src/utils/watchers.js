// @flow
import database from 'utils/database';
import { deleteListSuccess } from 'redux/list';

const bindWatchers = (id: string, dispatch: Function): void => {
  database.ref('/lists').on('child_removed', list => {
    if (id === list.key) {
      dispatch(deleteListSuccess());
    }
  });
};

export default bindWatchers;
