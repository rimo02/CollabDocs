import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from "@mui/material";

function AddCard({ title }) {
    const navigate = useNavigate()
    const handleAddocument = async () => {
        const token = localStorage.getItem("token")
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: "Untitled Document", content: "" })
        })
        const newDoc = await response.json();
        console.log(newDoc)
        navigate(`/editor/${newDoc._id}`)
    }
    return (
        <Card sx={{ width: "100%", maxWidth: 180, boxShadow: 3, padding: 1 }}>
            <CardActionArea onClick={() => handleAddocument()}>
                <CardMedia
                    component="img"
                    height="100"
                    image="data:image/png;base64,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" alt="Docs Logo"
                />
                <CardContent>
                    <Typography variant="h8" gutterBottom>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AddCard