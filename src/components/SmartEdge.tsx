import { EdgeProps, BaseEdge } from 'reactflow';

// Calculate the intersection point on a circle (node boundary)
function getNodeIntersection(
  nodeX: number,
  nodeY: number,
  targetX: number,
  targetY: number,
  nodeRadius: number
): { x: number; y: number } {
  const dx = targetX - nodeX;
  const dy = targetY - nodeY;
  const angle = Math.atan2(dy, dx);
  
  return {
    x: nodeX + Math.cos(angle) * nodeRadius,
    y: nodeY + Math.sin(angle) * nodeRadius,
  };
}

export function SmartEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}: EdgeProps) {
  const nodeRadius = 32; // Half of node width (64px / 2)

  // Calculate intersection points on the node boundaries
  const sourceIntersection = getNodeIntersection(
    sourceX,
    sourceY,
    targetX,
    targetY,
    nodeRadius
  );

  const targetIntersection = getNodeIntersection(
    targetX,
    targetY,
    sourceX,
    sourceY,
    nodeRadius
  );

  // Use straight edge path for cleaner look
  const edgePath = `M ${sourceIntersection.x},${sourceIntersection.y} L ${targetIntersection.x},${targetIntersection.y}`;

  return (
    <BaseEdge 
      id={id} 
      path={edgePath} 
      markerEnd={markerEnd} 
      style={style}
    />
  );
}
