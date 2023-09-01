import {View, LayoutAnimation} from 'react-native';
import {useState, useContext, useEffect, useMemo} from 'react';
import {FishGameContext} from '../../providers/FishGame.Provider';

import {GameWrapper} from '../../components/GameWrapper';
import {COLORS} from '../../values/Colors';
import BackgroundImage from '../../values/BackgroundImage';
import {Fish, Deck, RainDrop} from '../../components/Fish Game';
import {
  constants,
  generateFish,
  randomRaindropPositions,
} from '../../utilities/Fish Game';
import Modal from '../../components/Fish Game/modal';

const {poundAreaHeight, poundAreaWidth} = constants;

const Demo = ({navigation}) => {
  const {interpolations, setShowDemo} = useContext(FishGameContext);

  const [demoState, setDemoState] = useState({
    demoStage: 1,
    hightlightFishId: 0,
    baitCount: 2,
    fish: generateFish(2),
    rainDrops: randomRaindropPositions(5),
  });

  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 2:
        return (
          <Modal
            content="tap one fish,remember the fish that has been fed"
            style={{top: '10%'}}
            showContinue={false}
          />
        );
      case 3:
        return (
          <Modal
            content="feed the remaining fish"
            style={{top: '10%'}}
            showContinue={false}
          />
        );
      default:
        return null;
    }
  });

  return (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.fishBGColor}>
      {demoState.demoStage === 1 || demoState.demoStage === 4 ? (
        <Modal
          content={demoState.demoStage === 1 ? 'instructions' : 'final'}
          onPress={() => {
            if (demoState.demoStage === 4) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
              setShowDemo(false);
              return;
            }
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );

            setDemoState({...demoState, demoStage: 2});
          }}
        />
      ) : (
        <>
          <View
            style={{
              height: poundAreaHeight,
              width: poundAreaWidth,
              // backgroundColor: 'rgb(32, 156, 226)',
            }}>
            {demoState.fish.map((fish, index) => (
              <Fish
                key={fish.id}
                fishProps={fish}
                interpolations={interpolations}
                level={0}
                demoState={demoState}
                setDemoState={setDemoState}
              />
            ))}
            {demoState.rainDrops.map(raindrop => (
              <RainDrop
                key={raindrop.id}
                interval={raindrop.interval}
                position={raindrop.position}
              />
            ))}
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignItems: 'center',
            }}>
            <Deck baitCount={demoState.baitCount} lives={1} level={0} />
          </View>
        </>
      )}

      {ModalFlow}
    </GameWrapper>
  );
};
export default Demo;
