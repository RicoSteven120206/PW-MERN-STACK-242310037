import { Cards } from "@/components/ui/cards";
const CardCalculates = ({ title, value, icon }) => {
  return (
    <Cards>
      <Cards.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p
              className="text-muted mb-1 small"
            >
              {title}
            </p>
            <h4 className="mb-0" style={{ color: "#437059" }}>
              {value}
            </h4>
          </div>
          <div
            className="rounded-circle text-center"
            style={{
              backgroundColor: "rgba(67, 112, 89, 0.1)",
              width: 40,
              height: 40,
            }}
          >
            <i
              className={`bi bi-${icon} fs-4`}
              style={{ color: "#437059" }}
            ></i>
          </div>
        </div>
      </Cards.Body>
    </Cards>
  );
};
export { CardCalculates };
