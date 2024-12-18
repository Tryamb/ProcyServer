// Middleware function
export const layer = (req, res, next) => {
    const allowedOrigin = process.env.Allowed_Domain;
    const origin = req.headers.origin;
  
    if (origin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      next();
    } else {
      res.status(403).json();
    }
  };
  