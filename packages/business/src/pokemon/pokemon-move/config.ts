import { EnsurePokemonMoveAttributesParams } from './interface';

export function ensureAttributes(
  params: EnsurePokemonMoveAttributesParams,
): Omit<EnsurePokemonMoveAttributesParams, 'moveByOrder'> {
  if (params?.moveByOrder) {
    const effect_entries = params.moveByOrder?.effect_entries[0];
    return {
      pp: params.moveByOrder?.pp,
      type: params.moveByOrder?.type?.name,
      power: params.moveByOrder?.power,
      target: params.moveByOrder?.target?.name,
      effect: effect_entries?.effect,
      priority: params.moveByOrder?.priority,
      accuracy: params.moveByOrder?.accuracy,
      short_effect: effect_entries?.short_effect,
      damage_class: params.moveByOrder?.damage_class?.name,
      effect_chance: params.moveByOrder?.effect_chance,
    };
  }
  return {
    pp: params?.pp,
    type: params?.type,
    power: params?.power,
    target: params?.target,
    effect: params?.effect,
    priority: params?.priority,
    accuracy: params?.accuracy,
    short_effect: params?.short_effect,
    damage_class: params?.damage_class,
    effect_chance: params?.effect_chance,
  };
}