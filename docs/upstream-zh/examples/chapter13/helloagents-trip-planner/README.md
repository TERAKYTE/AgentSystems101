# HelloAgents Trip Planner

This example is an intelligent trip-planning assistant built with the HelloAgents framework. It integrates an AMap MCP server to support itinerary generation with points of interest, routing, and weather data.

## Features

- AI-assisted multi-day trip planning with `SimpleAgent`.
- AMap MCP integration for POI search, routes, and weather lookup.
- Automatic tool calls for real-time travel context.
- Vue 3, TypeScript, Vite, and Ant Design Vue frontend.
- Recommendations for lodging, transportation, dining, and sightseeing time.

## Stack

Backend:

- HelloAgents with `SimpleAgent`.
- FastAPI.
- `amap-mcp-server`.
- LLM provider support such as OpenAI or DeepSeek.

Frontend:

- Vue 3 and TypeScript.
- Vite.
- Ant Design Vue.
- AMap JavaScript API.
- Axios.

## Project Structure

```text
helloagents-trip-planner/
├── backend/                    # Backend service
│   ├── app/
│   │   ├── agents/             # Agent implementation
│   │   ├── api/                # FastAPI routes
│   │   ├── services/           # Service layer
│   │   ├── models/             # Data schemas
│   │   └── config.py           # Configuration
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
├── frontend/                   # Frontend app
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Quickstart

Prerequisites:

- Python 3.10 or newer.
- Node.js 16 or newer.
- AMap API keys for Web Service API and JavaScript API.
- LLM API key.

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.api.main:app --reload --host 0.0.0.0 --port 8000
```

Fill in `.env` before starting the service.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Usage

1. Enter destination, dates, trip duration, transportation preference, lodging preference, and travel style.
2. Click **Generate Trip Plan**.
3. The backend agent drafts an itinerary, calls AMap MCP tools, retrieves weather and route context, and combines the results into a structured plan.
4. Review daily itinerary details, attraction metadata, map markers, route planning, weather forecast, and dining suggestions.

## Core Integration

The backend uses `MCPTool` to expose AMap tools to a HelloAgents agent. The agent can call:

- `maps_text_search` for POI search.
- `maps_weather` for weather lookup.
- `maps_direction_walking_by_address` for walking routes.
- `maps_direction_driving_by_address` for driving routes.
- `maps_direction_transit_integrated_by_address` for public-transit routes.

## API Docs

After starting the backend, open `http://localhost:8000/docs`.

Main endpoints:

- `POST /api/trip/plan`: generate a trip plan.
- `GET /api/map/poi`: search POIs.
- `GET /api/map/weather`: query weather.
- `POST /api/map/route`: plan a route.

## License

CC BY-NC-SA 4.0

## Attribution

- [Hello-Agents](https://github.com/datawhalechina/hello-agents)
- [HelloAgents framework](https://github.com/jjyaoao/HelloAgents)
- [AMap Open Platform](https://lbs.amap.com/)
- [amap-mcp-server](https://github.com/sugarforever/amap-mcp-server)
