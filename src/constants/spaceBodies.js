export const SOLAR_MULTIPLIER_MERCURY                = 6.672;
export const SOLAR_MULTIPLIER_VENUS                  = 1.9;
export const SOLAR_MULTIPLIER_EARTH                  = 1;
export const SOLAR_MULTIPLIER_LUNA                   = 1;
export const SOLAR_MULTIPLIER_INNER_SYSTEM_ASTEROIDS = 0.616;
export const SOLAR_MULTIPLIER_MARS                   = 0.432;
export const SOLAR_MULTIPLIER_INNER_ASTEROID_BELT    = 0.168;
export const SOLAR_MULTIPLIER_MIDDLE_ASTEROID_BELT   = 0.128;
export const SOLAR_MULTIPLIER_OUTER_ASTEROID_BELT    = 0.12;
export const SOLAR_MULTIPLIER_JUPITER                = 0.1;
export const SOLAR_MULTIPLIER_SATURN                 = 0.1;
export const SOLAR_MULTIPLIER_CENTAURS_AND_TROJANS   = 0.1;
export const SOLAR_MULTIPLIER_URANUS                 = 0.1;
export const SOLAR_MULTIPLIER_NEPTUNE                = 0.1;
export const SOLAR_MULTIPLIER_KUIPER_BELT            = 0.1;

export const MERCURY                = 'Mercury';
export const VENUS                  = 'Venus';
export const EARTH                  = 'Earth';
export const LUNA                   = 'Luna';
export const INNER_SYSTEM_ASTEROIDS = 'Inner System Asteroids';
export const MARS                   = 'Mars';
export const INNER_ASTEROID_BELT    = 'Inner Asteroid Belt';
export const MIDDLE_ASTEROID_BELT   = 'Middle Asteroid Belt';
export const OUTER_ASTEROID_BELT    = 'Outer Asteroid Belt';
export const JUPITER                = 'Jupiter';
export const SATURN                 = 'Saturn';
export const CENTAURS_AND_TROJANS   = 'Centaurs and Trojans';
export const URANUS                 = 'Uranus';
export const NEPTUNE                = 'Neptune';
export const KUIPER_BELT            = 'Kuiper Belt';

export const BODIES = [
    MERCURY,
    VENUS,
    EARTH,
    LUNA,
    INNER_SYSTEM_ASTEROIDS,
    MARS,
    INNER_ASTEROID_BELT,
    MIDDLE_ASTEROID_BELT,
    OUTER_ASTEROID_BELT,
    JUPITER,
    SATURN,
    CENTAURS_AND_TROJANS,
    URANUS,
    NEPTUNE,
    KUIPER_BELT,
];

export const BODIES_SOLAR_MULTIPLIER_MAP = {
    [MERCURY]:                SOLAR_MULTIPLIER_MERCURY,
    [VENUS]:                  SOLAR_MULTIPLIER_VENUS,
    [EARTH]:                  SOLAR_MULTIPLIER_EARTH,
    [LUNA]:                   SOLAR_MULTIPLIER_LUNA,
    [INNER_SYSTEM_ASTEROIDS]: SOLAR_MULTIPLIER_INNER_SYSTEM_ASTEROIDS,
    [MARS]:                   SOLAR_MULTIPLIER_MARS,
    [INNER_ASTEROID_BELT]:    SOLAR_MULTIPLIER_INNER_ASTEROID_BELT,
    [MIDDLE_ASTEROID_BELT]:   SOLAR_MULTIPLIER_MIDDLE_ASTEROID_BELT,
    [OUTER_ASTEROID_BELT]:    SOLAR_MULTIPLIER_OUTER_ASTEROID_BELT,
    [JUPITER]:                SOLAR_MULTIPLIER_JUPITER,
    [SATURN]:                 SOLAR_MULTIPLIER_SATURN,
    [CENTAURS_AND_TROJANS]:   SOLAR_MULTIPLIER_CENTAURS_AND_TROJANS,
    [URANUS]:                 SOLAR_MULTIPLIER_URANUS,
    [NEPTUNE]:                SOLAR_MULTIPLIER_NEPTUNE,
    [KUIPER_BELT]:            SOLAR_MULTIPLIER_KUIPER_BELT,
}