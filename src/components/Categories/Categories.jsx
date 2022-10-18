import React from 'react';
import PropTypes from "prop-types";

export const Categories = ({categoriesChecked,onChange}) => {

    return (

        <ul className={'mt-4'} style={{listStyle: 'none', padding: '0'}}>

            {categoriesChecked.map((category) => (
                <li key={category.id}>
                    <div className="form-check mb-3">
                        <input
                            data-category-id={category.id}
                            onChange={()=>onChange(category.id)}
                            checked={category.checked}
                            type="checkbox"
                        />
                        <label>
                            {category.name}
                        </label>
                    </div>
                </li>
            ))}

        </ul>
    );
}

Categories.propTypes = {
    onChange:PropTypes.func,
    categoriesChecked:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        checked: PropTypes.bool,
        name: PropTypes.string,
    }))
}
