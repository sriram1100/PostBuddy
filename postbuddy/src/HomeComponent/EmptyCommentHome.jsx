import React from 'react';
import Typography from '@material-ui/core/Typography';

function EmptyCommentHome({match}) {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" gutterBottom>
            There is no comments to display! Be the first one to comment
            </Typography>
        </div>
    )
}

export default EmptyCommentHome;