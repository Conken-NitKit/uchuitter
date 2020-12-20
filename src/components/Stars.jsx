import * as THREE from "three/src/Three";
import React, { useRef, useMemo } from "react";
import { useRender } from "react-three-fiber";

const Stars = () => {
  let group = useRef();
  let theta = 0;

  // フレームごとに実行される処理
  useRender(() => {
    const r = Math.sin(THREE.Math.degToRad((theta += 0.1))) * 2.5;
    const s = Math.abs(((theta * 0.015) % 1) - 0.5) + 0.07;
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });

  // 初期化処理
  const [geo, mat, coords] = useMemo(() => {
    // 円球のジオメトリ（ポリゴン）をつくる。SphereBufferGeometry の引数は
    // (半径, 横方向を何面にするか, 縦方向を何面にするか)
    const geo = new THREE.SphereBufferGeometry(1.5, 10, 10);

    // 円球のマテリアル（質感）をつくる。
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("lightblue"),
    });
    const coords = new Array(2000)
      .fill()
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};

export default Stars;
