import { Grid, Typography } from "@mui/material";
import FooterCard from "../Cards/FooterCard";

function Footer({ documents, setDocuments }) {
  return (
    <div className="w-full p-1">
      {documents.length > 0 ? (
        <Grid container spacing={2}>
          {documents.map((doc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doc._id}>
              <FooterCard doc={doc} setDocuments={setDocuments} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No documents found
        </Typography>
      )}
    </div>
  );
}

export default Footer;
