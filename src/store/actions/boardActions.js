import newGuid from '../utils/guid';
import * as _ from 'lodash';
import { CellFactory } from '../model/board-cell.factory';
import { Boards } from '../model/Boards';
import notifiy from '../../components/notifications/Notification';

// Get all boards within this user's domain/team.
export const getBoards = (loadFirst) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            dispatch({ type: 'ATTEMPT_LOADING_BOARDS' });
            
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            const boards = await boardsHelper.list(dispatch);
    
            if (!boards || boards.length < 1) {
                dispatch({ type: 'NO_BOARDS' });
            } else {
                if (loadFirst) {
                    dispatch(getBoard(boards[0].id));        
                }
                dispatch({ type: 'REFRESH_BOARDS', payload: boards });
            }
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to get the boards' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Create a new blank board with this user's domain/team.
export const newBoard = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });

            const currentBoard = getState().boards.currentBoard;

            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentBoard && currentBoard.unsubscribe) {
                currentBoard.unsubscribe();
            }
            
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            const newBoard = await boardsHelper.add();
            dispatch({ type: 'SET_CURRENT_BOARD', payload: newBoard });
    
            dispatch(getBoards());        
            dispatch(getBoard(newBoard.id));        
            
        } catch (error) {
            console.log('Board add error', error);
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to create the new board' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }

        return Promise.resolve(newBoard);
    }
}

// Create a new blank board with this user's domain/team.
export const addNewFolder = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
        const newFolder = await boardsHelper.addFolder();
        dispatch({ type: 'SET_PROGRESS', payload: false });

        dispatch(getBoards());        

        return Promise.resolve(newFolder);
    }
}

// Removes the specified folder using folder id.
export const removeFolder = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const boardsHelper = new Boards(getFirebase(), getState().domain.domainId)
        await boardsHelper.removeFolder(id);
        dispatch({ type: 'SET_PROGRESS', payload: false });

        dispatch(getBoards());        

        return Promise.resolve();
    }
}

// Get an individual board by id.
export const getBoard = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'ATTEMPT_LOADING_BOARD', payload: id });
    
            const currentBoard = getState().boards.currentBoard;
    
            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentBoard && currentBoard.unsubscribe) {
                currentBoard.unsubscribe();
            }
    
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            const board = await boardsHelper.get(id, dispatch, getState);
            board.roles = await boardsHelper.getBoardRoles(id);

            dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to get the board' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Get a board roles by board id.
export const getBoardRoles = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'ATTEMPT_LOADING_BOARD_ROLES', payload: id });
    
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            const boardRoles = await boardsHelper.getBoardRoles(id);
    
            dispatch({ type: 'SET_CURRENT_BOARD_ROLES', payload: boardRoles });
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to get the board roles' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Remove the specified board via the board id supplied
export const removeBoard = (boardId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            await boardsHelper.delete(boardId);
    
            let nextBoardId;   
    
            const currentBoards = await boardsHelper.list();
            const currentBoard = getState().boards.currentBoard;
    
            if (currentBoards && currentBoards.length > 0) {
                nextBoardId = currentBoards[0].id;
            }
    
            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentBoard && currentBoard.unsubscribe) {
                currentBoard.unsubscribe();
            }
            
            dispatch(getBoards());
    
            if (nextBoardId) {
                dispatch(getBoard(nextBoardId));
            }
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to remove the board' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }

        return Promise.resolve();
    }
}

export const updateBoard = (board) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
            dispatch({ type: 'SET_PROGRESS', payload: true });
            dispatch({ type: 'ATTEMPT_UPDATE_BOARD', payload: board });
    
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            await boardsHelper.update(board);
            dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
            dispatch(getBoards());
            dispatch({ type: 'SET_PROGRESS', payload: false });
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: error.message });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const updateBoardRoles = (boardId, roles) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            dispatch({ type: 'SET_CURRENT_BOARD_ROLES', payload: roles });
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            await boardsHelper.updateBoardRoles(boardId, roles);
            dispatch({ type: 'SET_PROGRESS', payload: false });
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to update the board roles' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const newRow = (row, groupId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
    
            let newData = { id: newGuid(), description: row.description, group: row.groupKey };
    
            if (currentBoard.columns) {
                // Add any default values
                currentBoard.columns.forEach(col => {
                    // Check if column is of type select.
                    if (col.class === 'select' && col.values) {
                        
                        // Check if any values for the select column are marked as the default value.
                        col.values.forEach(val => {
                            if (val['default'] === true) {
                                newData = {...newData, [col.model]: val.key }
                            }
                        });
                    } else if (col.class === 'date' || col.class === 'datedue') {
                        newData = {...newData, [col.model]: '' }
                    } else if (col.class === 'text' && col.model !== 'description') {
                        newData = {...newData, [col.model]: '' }
                    }
                });
            }
    
            // Default the entities array to an empty array if it does not exist.
            if (currentBoard.groups[groupId] && !currentBoard.groups[groupId].entities) {
                currentBoard.groups[groupId].entities = [];    
            }
    
            // Add the new row to the current board, this MUST include the columns too.
            currentBoard.groups[groupId].entities.push(newData);
    
            // Need to remove subscription function before saving.
            const updatedBoard = _.cloneDeep(currentBoard);
            delete updatedBoard.unsubscribe;
    
            const data = JSON.parse(JSON.stringify(updatedBoard));
    
            await firebase.firestore()
                .collection('domains')
                .doc(domainId)
                .collection('boards')
                .doc(data.id)
                .set(data);
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to add the new row' });
            
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const removeRow = (rowIdxToRemove, groupId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
    
            // Add the new row to the current board, this MUST include the columns too.
            currentBoard.groups[groupId].entities = currentBoard.groups[groupId].entities.filter((e, idx) => idx !== rowIdxToRemove);
    
            // Need to remove subscription function before saving.
            const updatedBoard = _.cloneDeep(currentBoard);
            delete updatedBoard.unsubscribe;
    
            await firebase.firestore()
                .collection('domains')
                .doc(domainId)
                .collection('boards')
                .doc(updatedBoard.id)
                .set(updatedBoard);
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to remove the row' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}


export const addColumn = (columnType) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
    
            const model = newGuid();
            const cellFactory = new CellFactory();
            const newCell = JSON.parse(JSON.stringify(cellFactory.createCell(columnType, model, model)));
            currentBoard.columns.push(newCell);
    
            delete currentBoard['unsubscribe'];
    
            await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(currentBoard.id)
            .set(currentBoard);
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to add the new column' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const removeColumn = (modelId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
    
            // Remove the column data
            currentBoard.columns = currentBoard.columns.filter(c => c.model !== modelId);
    
            // Remove the orphaned entity data for this column.
            let groups = Object.keys(currentBoard.groups);
    
            // // Loop through all groups and remove the column from any entities.
            groups.map(grpKey =>{
                if (currentBoard.groups[grpKey] && currentBoard.groups[grpKey].entities) {
                    currentBoard.groups[grpKey].entities = currentBoard.groups[grpKey].entities.map(e => {
                        delete e[modelId];
                        return e;
                    })
                }
                return grpKey;
            });
    
            // currentBoard.groups = groups;
    
            delete currentBoard['unsubscribe'];
    
            await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(currentBoard.id)
            .set(currentBoard);
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to remove the column' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const selectCellValue = (key, model, rowId, groupId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const domainId = getState().domain.domainId;
            const currentBoard = getState().boards.currentBoard;
    
            currentBoard.groups[groupId].entities = currentBoard.groups[groupId].entities.map(e => {
                // Is this the row we wish to update?
                if (e.id === rowId) {
                    e[model] = key;
                }
    
                return e;
            });
    
            delete currentBoard['unsubscribe'];
    
            await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(currentBoard.id)
            .set(currentBoard);
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to update the board' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const updateColumnValue = (valueKey, newTitle, columnModel) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === columnModel) {
                c.values = c.values.map(v => {
                    if (v.key === valueKey) {
                        v.title = newTitle
                    }
                    return v;
                })
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const updateColumn = (updatedColumn) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === updatedColumn.model) {
                c = updatedColumn;
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}


export const updateColumnValueColor = (valueKey, newColor, columnModel, fgColor) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === columnModel) {
                c.values = c.values.map(v => {
                    if (v.key === valueKey) {
                        if (fgColor) {
                            v.fgColor = newColor
                        } else {
                            v.color = newColor
                        }
                    }
                    return v;
                })
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const updateColumnValueStatus = (valueKey, disabled, columnModel) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === columnModel) {
                c.values = c.values.map(v => {
                    if (v.key === valueKey) {
                        v.disabled = disabled;
                    }
                    return v;
                })
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const addNewColumnValue = (columnModel) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === columnModel) {
                c.values = [...c.values, { key: newGuid(), color: 'EFF1F3', fgColor: '595959', title: 'New Label', disabled: false }];
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const updateColumnValueOrder = (data) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        // Helper function for drag drop reordering or board rows.
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        currentBoard.columns = currentBoard.columns.map(c => {
            if (c.model === data.destination.droppableId) {
                c.values = reorder(c.values, data.source.index, data.destination.index);
            }
            return c;
        });

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const addGroup = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const currentBoard = getState().boards.currentBoard;
        const domainId = getState().domain.domainId;

        const groupColors = ['FFA300',
                            '06D6A0', 'EF476F', '26547C',
                            '2A4DA1', '8E58A4', 'FAA434', 'FF916E', 'AD3F5A',
                            '134B5E', '6CA88F', '231E1F', 'F8C500', 'E01A4F', '2176FF', 
                            'F9C22E', 'D5513D', '363537', 'FFD166', 'EE3A33', 'FCDB3E'];

        const groupCount = currentBoard.groups.length;

        const newGroupColor = groupColors[groupCount-1];

        const newGroup = { id: newGuid(), color: newGroupColor, name: 'New Group' };
        currentBoard.groups = [...currentBoard.groups, newGroup ];

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const collapseGroup = (groupIdx) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const currentBoard = getState().boards.currentBoard;
        const domainId = getState().domain.domainId;

        currentBoard.groups[groupIdx].collapsed = !currentBoard.groups[groupIdx].collapsed;

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const removeGroup = (groupId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const currentBoard = getState().boards.currentBoard;
        const domainId = getState().domain.domainId;

        if (currentBoard.groups.length > 1) {
            currentBoard.groups = currentBoard.groups.filter(grp => grp.id !== groupId);
            delete currentBoard['unsubscribe'];
    
            await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(currentBoard.id)
            .set(currentBoard);
        }

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

// Create a new blank board with this user's domain/team.
export const updateBoardTitle = (boardId, updateBoardTitle) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const boardsHelper = new Boards(getFirebase(), getState().domain.domainId);
            const newFolder = await boardsHelper.updateBoardTitle(boardId, updateBoardTitle);
    
            dispatch(getBoards());        
            return Promise.resolve(newFolder);
        } catch (error) {
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to update the board description' });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const updateColumnOrder = (data) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        // Helper function for drag drop reordering or board columns.
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        // currentBoard.columns = currentBoard.columns.map(c => {
        //     if (c.model === data.destination.droppableId) {
        //         c.values = reorder(c.values, data.source.index, data.destination.index);
        //     }
        //     return c;
        // });

        currentBoard.columns = reorder(currentBoard.columns, data.source.index, data.destination.index);

        console.log('setting current board', currentBoard);

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const updateGroupOrder = (data) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        // Helper function for drag drop reordering or board columns.
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        // currentBoard.columns = currentBoard.columns.map(c => {
        //     if (c.model === data.destination.droppableId) {
        //         c.values = reorder(c.values, data.source.index, data.destination.index);
        //     }
        //     return c;
        // });

        currentBoard.groups = reorder(currentBoard.groups, data.source.index, data.destination.index);

        console.log('setting current board', currentBoard);

        dispatch({ type: 'SET_CURRENT_BOARD', payload: currentBoard });

        delete currentBoard['unsubscribe'];

        await firebase.firestore()
        .collection('domains')
        .doc(domainId)
        .collection('boards')
        .doc(currentBoard.id)
        .set(currentBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const selectRow = rowId => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        let selectedRows = getState().boards.selectedRows;
        
        if (selectedRows.includes(rowId)) {
            dispatch({ type: 'SET_SELECTED_ROWS', payload: selectedRows.filter(r => r !== rowId) })
        } else {
            dispatch({ type: 'SET_SELECTED_ROWS', payload: [...getState().boards.selectedRows, rowId] })
        }
    }
}

export const clearSelectedRows = row => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'SET_SELECTED_ROWS', payload: [] })

    }
}

export const moveToGroup = destinationGroupId => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
            const selectedRows = getState().boards.selectedRows;

            const updatedBoard = _.cloneDeep(currentBoard);

            // Loop through all groups and get the rows to move.
            // Only take row if not already in destination group.
            let rowsToMove = [];
            updatedBoard.groups = updatedBoard.groups.map(g => {
                if (g.id !== destinationGroupId) {
                    // Loop through all rows in the group and add to array if selected.
                    rowsToMove = [...rowsToMove, ...g.entities.filter(e => selectedRows.includes(e.id))]

                    // Remove the row from the group if selected.
                    g.entities = g.entities.filter(e => !selectedRows.includes(e.id))
                }

                return g
            })

            if (rowsToMove.length > 0) {
    
                updatedBoard.groups = updatedBoard.groups.map(g => {
                    if (g.id === destinationGroupId) {
                        if (!g.entities) {
                            g.entities = [];    
                        }
        
                        // Add the new row to the current board, this MUST include the columns too.
                        rowsToMove.forEach(r => {
                            g.entities.push(r);
                        })
                    }
                    return g;
                })
            
                delete updatedBoard.unsubscribe;
    
                const data = JSON.parse(JSON.stringify(updatedBoard));
        
                await firebase.firestore()
                    .collection('domains')
                    .doc(domainId)
                    .collection('boards')
                    .doc(data.id)
                    .set(data);

                    dispatch({ type: 'SET_SELECTED_ROWS', payload: [] })
            }
    
        } catch (error) {
            console.log(error)
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to move the rows' });
            
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }

    }
}

export const deleteSelectedRows = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const firebase = getFirebase();
            const currentBoard = getState().boards.currentBoard;
            const domainId = getState().domain.domainId;
            const selectedRows = getState().boards.selectedRows;

            const updatedBoard = _.cloneDeep(currentBoard);

            // Loop through all groups and get the rows to move.
            // Only take row if selected.
            updatedBoard.groups = updatedBoard.groups.map(g => {
                // Remove the row from the group if selected.
                g.entities = g.entities.filter(e => !selectedRows.includes(e.id))

                return g
            })
        
            delete updatedBoard.unsubscribe;

            const data = JSON.parse(JSON.stringify(updatedBoard));
    
            await firebase.firestore()
                .collection('domains')
                .doc(domainId)
                .collection('boards')
                .doc(data.id)
                .set(data);

                dispatch({ type: 'SET_SELECTED_ROWS', payload: [] })
    
        } catch (error) {
            console.log(error)
            notifiy({ type: 'error', message: 'Board Failure', description: 'Failed to move the rows' });
            
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }

    }
}
