/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
//[00:08:14.580] shooterSteamID:76561197978390518, shooterName:"Zacadien", targetSteamID:76561198064851703,
// targetName:"Snow", weapon:Model70, distance:22.09, damage:53.21*1.00x=53.21, melee:0, headshot:0, kill:1,
// part:23(Bip01 Spine1), hitType:ammo_223, projectile:ammo_223
import React, {
  PropTypes,
} from 'react';

import styled from 'styled-components';
import Paper from 'material-ui/Paper';

import {darkGrey, black, white} from '../../../styles/colors';

const DamageEventCard = (props) => {
  console.log(props);
  return (
    <DamageEvent zDepth={1}>
      <Date>Date: 12-14-2016</Date>
      <Time>Time: 00:08:13.279</Time>
      <ShooterName>ShooterName: Snow</ShooterName>
      <Shooter>Shooter: 76561198064851703</Shooter>
      <TargetName>TargetName: 76561198064851703</TargetName>
      <Target>Target: 76561198064851703</Target>
      <Weapon>Weapon: Model70</Weapon>
      <Distance>Distance: 22.09</Distance>
      <Damage>Damage: 53.21*1.00x=53.21</Damage>
      <Melee>Melee: 0</Melee>
      <HeadShot>HeadShot: 0</HeadShot>
      <Kill>Kill: 1</Kill>
      <Part>Part: 23(Bip01 Spine1)</Part>
      <HitType>HitType: ammo_223</HitType>
      <Projectile>Projectile: ammo_223</Projectile>
    </DamageEvent>
  );
};
const DamageEvent = styled(Paper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 25px;
  width: 80%;
  font-weight: 400;
  color: ${darkGrey};
  background-color: ${'#b24944'} !important;
  position: relative;
  padding: 15px;
  min-height: 120px;
  border-radius: 10px;
`;
const Date = styled.div`
  
`;
const Time = styled.div`
  
`;
const ShooterName = styled.div`
  
`;
const Shooter = styled.div`
  
`;
const TargetName = styled.div`
  
`;
const Target = styled.div`
  
`;
const Weapon = styled.div`
  
`;
const Distance = styled.div`
  
`;
const Damage = styled.div`
  
`;
const Melee = styled.div`
  
`;
const HeadShot = styled.div`
  
`;
const Kill = styled.div`
  
`;
const Part = styled.div`
  
`;
const HitType = styled.div`
  
`;
const Projectile = styled.div`
  
`;


DamageEventCard .propTypes = {};
DamageEventCard .defaultProps = {};

export default DamageEventCard ;
