
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function MyCommandCell({ edit, remove, add, update, discard, cancel,confirm, editField }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            const isNewItem = dataItem.id === undefined;

            return inEdit ? (
                <td className="k-command-cell">
                    <button
                        className="button sm mr-3"
                        onClick={() => isNewItem ? add(dataItem) : update(dataItem)}
                        
                    >
                          {/* <span className="k-icon k-i-pencil"></span> &nbsp; */}
                        {isNewItem ? 'Add' : 'Update'}
                    </button>
                    <button
                        className="button secondary sm"
                        onClick={() => isNewItem ? discard(dataItem) : cancel(dataItem)}
                    >
                          {/* <span className="k-icon k-i-cancel"></span> &nbsp; */}
                        {isNewItem ? 'Discard' : 'Cancel'}
                    </button>
                </td>
            ) : (
                <td className="k-command-cell">
                    <button
                        className="button  sm mr-3"
                        onClick={() => edit(dataItem)}
                    >
                         {/* <span className="k-icon k-i-pencil"></span> &nbsp; */}
                        Edit
                    </button>
                    <button
                        className="button secondary sm"
                        onClick={() => 
                            remove(dataItem)
                        }
                    >
                         {/* <span className="k-icon k-i-delete"></span> &nbsp; */}
                        Remove
                    </button>
                </td>
            );
        }
    }
};

