import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from "@mui/material";

function FooterCard({ doc, setDocuments }) {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error("Failed to delete document");
            setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Card sx={{ width: "100%", maxWidth: 170, boxShadow: 3, padding: 1 }}>
            <CardActionArea disableRipple>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
                    alt="Docs Logo"
                    onClick={() => navigate(`/editor/${doc._id}`)}
                />
                <CardContent>
                    <Typography variant="h8" gutterBottom>
                        {doc.title.length > 17 ? doc.title.substring(0, 17) + "..." : doc.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary gra">
                        {new Date(doc.createdAt).toLocaleDateString()}
                        <IconButton
                            onClick={() => handleDelete(doc._id)}
                            sx={{ position: "relative", marginLeft: 4 }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} size="xs" />
                        </IconButton>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default FooterCard;
