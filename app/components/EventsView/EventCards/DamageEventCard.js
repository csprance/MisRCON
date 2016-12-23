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
import format from 'date-fns/format'
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

import {darkGrey, black, white} from '../../../styles/colors';

const DamageEventCard = (props) => {
  return (
    <DamageEvent kill={props.kill} zDepth={1}>
      <Time>{format(props.time, 'HH:mm:ss')}</Time>
      <ShooterName>{props.name}</ShooterName>
      <Shooter>Shooter: {props.steam}</Shooter>
      <TargetName>TargetName: {props.targetSteam}</TargetName>
      <Target>Target: {props.targetName}</Target>
      <Weapon>Weapon: {props.weapon}</Weapon>
      <Distance>Distance: {props.distance}</Distance>
      <Damage>Damage: {props.damage}</Damage>
      <Melee>Melee: {props.melee}</Melee>
      <HeadShot>HeadShot: {props.headshot}</HeadShot>
      <Kill>Kill: {props.kill}</Kill>
      <Part>Part: {props.part}</Part>
      <HitType>HitType: {props.hitType}</HitType>
      <Projectile>Projectile: {props.projectile}</Projectile>
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
  background-color: ${(props)=> props.kill === '1' ? '#b24944' : '#969064'} !important;
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
