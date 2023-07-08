import React from 'react';

const CategoryForm = ({handleSubmit,value,setValue}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 ms-4 row">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            id="inputCategory"
                            placeholder='Enter New Category'
                            value={value}
                            onChange={(e)=> setValue(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </div>
            </form>
        </>);
};

export default CategoryForm;
