import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const MONGO_HOST =
  process.env.MONGO_URL || `mongodb://localhost/wild_traveller_typescript`;

const config = {
  mongo: MONGO_HOST,
  mongoOptions: MONGO_OPTIONS,
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET_KEY ?? "",
};

export default config;
