import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Hotel, 
  Utensils, 
  ShoppingBag, 
  Compass, 
  Sparkles,
  Layers
} from 'lucide-react';
import { DestinationData, PassengerDetails } from '../types/travel';

interface InteractiveRouteMapProps {
  destination: DestinationData;
  details: PassengerDetails;
  selectedStayName: string;
}

export const InteractiveRouteMap: React.FC<InteractiveRouteMapProps> = ({
  destination,
  details,
  selectedStayName
}) => {
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: 0,
      title: details.fromLocation,
      subtitle: 'Starting Origin Hub',
      type: 'origin',
      icon: Compass,
      x: 10,
      y: 50,
      detail: `Board scheduled transit from ${details.fromLocation}`
    },
    {
      id: 1,
      title: `${destination.name} Hub`,
      subtitle: 'Arrival & Transit Corridor',
      type: 'transit',
      icon: Navigation,
      x: 30,
      y: 35,
      detail: 'Arrival at main terminal / station'
    },
    {
      id: 2,
      title: selectedStayName,
      subtitle: 'Hotel / Base Stay',
      type: 'stay',
      icon: Hotel,
      x: 50,
      y: 60,
      detail: 'Central check-in and luggage storage'
    },
    {
      id: 3,
      title: destination.places[0]?.name || 'Tourist Place 1',
      subtitle: 'Primary Attraction',
      type: 'attraction',
      icon: MapPin,
      x: 68,
      y: 30,
      detail: `${destination.places[0]?.category} · Entry: ₹${destination.places[0]?.entryFee}`
    },
    {
      id: 4,
      title: destination.foods[0]?.famousAt.split(',')[0] || 'Local Food Haven',
      subtitle: 'Culinary Stop',
      type: 'food',
      icon: Utensils,
      x: 82,
      y: 70,
      detail: `Famous for ${destination.foods[0]?.name}`
    },
    {
      id: 5,
      title: destination.shopping[0]?.name || 'Artisan Market',
      subtitle: 'Shopping & Souvenirs',
      type: 'shopping',
      icon: ShoppingBag,
      x: 92,
      y: 40,
      detail: destination.shopping[0]?.famousFor
    }
  ];

  return (
    <div className="p-6 rounded-2xl bg-black/90 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-cyan-950/80">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Interactive Route Map Visualizer
            </h3>
          </div>
          <p className="text-xs text-cyan-400/80">
            Click any wayward node to preview transit sequencing and spatial coordinates.
          </p>
        </div>
        <div className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800">
          6 Strategic Waypoints
        </div>
      </div>

      {/* SVG Canvas Map Simulation */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl bg-black border border-cyan-900/80 overflow-hidden cyber-grid flex items-center justify-center p-4">
        {/* Subtle grid lines & radar circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-48 h-48 rounded-full border border-cyan-500 animate-ping" />
          <div className="w-80 h-80 rounded-full border border-cyan-500/40" />
        </div>

        {/* SVG Route Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points={nodes.map(n => `${n.x}%,${n.y}%`).join(' ')}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* Interactive Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border transition-all duration-300 group cursor-pointer ${
                isActive
                  ? 'bg-cyan-400 text-black border-white shadow-[0_0_20px_#06b6d4] scale-125 z-20'
                  : 'bg-black/90 text-cyan-400 border-cyan-700 hover:border-cyan-400 hover:scale-110 z-10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none transition-all ${
                isActive ? 'bg-cyan-500 text-black font-bold' : 'bg-black/90 border border-cyan-800 text-cyan-300'
              }`}>
                {node.title.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
            ACTIVE WAYPOINT {nodes[activeNode].id + 1} OF 6 · {nodes[activeNode].subtitle}
          </div>
          <h4 className="text-sm font-bold text-white mt-0.5">
            {nodes[activeNode].title}
          </h4>
          <p className="text-xs text-cyan-200/90 mt-1">
            {nodes[activeNode].detail}
          </p>
        </div>
        <button
          onClick={() => setActiveNode((activeNode + 1) % nodes.length)}
          className="px-3 py-1.5 rounded-lg bg-black border border-cyan-600 hover:border-cyan-400 text-cyan-300 text-xs font-mono shrink-0 transition-colors"
        >
          Next Leg →
        </button>
      </div>
    </div>
  );
};
