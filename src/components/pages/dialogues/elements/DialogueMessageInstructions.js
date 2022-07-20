import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const DialogueMessageInstructions = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Tag</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Example</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <code>{'{p=%d}'}</code>
        </TableCell>
        <TableCell>Pauses typing for %d seconds</TableCell>
        <TableCell>
          <code>{'Hello,{p=0.5} good to see you here'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{s=%s}'}</code>
        </TableCell>
        <TableCell>
          Emits the provided %s message as a signal at the position
        </TableCell>
        <TableCell>
          <code>{'I will {s=random_signal}emit something'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{a=%s}'}</code>
        </TableCell>
        <TableCell>
          If the message has a follower, they will play the %s animation. Will
          return to the previous animation when it finishes (and if it is not
          set to looping)
        </TableCell>
        <TableCell>
          <code>{'I will {a=stab}murder you'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{a=%s[F]}'}</code>
        </TableCell>
        <TableCell>
          Basically the same as the previous one, but freezes the animationon
          the last frame. Note that the target animation must not have looping
          enabled, otherwise it will not work
        </TableCell>
        <TableCell>
          <code>{'Hello {a=deep_dab[F]}world'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{a=%s[N=%s2]}'}</code>
        </TableCell>
        <TableCell>
          Plays the animation %s, then the animation %s2 as soon as %s finishes.
          Note that %s must not have looping enabled. The %s2 animation can have
          any looping strategy, just take into account that non-looping %s2 will
          freeze at the last frame.
        </TableCell>
        <TableCell>
          <code>{'Hello {a=deep_dab[N=hate_crime]} world'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{v=%d}...{/v}'}</code>
        </TableCell>
        <TableCell>
          Modifies the typing speed for the text between the tags. Note that you
          can skip the closing tag, and the speed will be applied to the rest of
          the sentence. The %d parameter will be used as the wait_time for the
          letter type timer.
        </TableCell>
        <TableCell>
          <code>
            {'I will {v=0.05}talk really fast here{/v} but slower here'}
          </code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{g}...{/g}'}</code>
        </TableCell>
        <TableCell>
          Modifies the font between the tags to the gibberish variant. They show
          as glitchy text, and will randomly change to other characters on
          random intervals
        </TableCell>
        <TableCell>
          <code>{'The text is {g}cursed{/g}'}</code>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <code>{'{w}...{/w}'}</code>
        </TableCell>
        <TableCell>
          Applies the wave bbcode tag with the parameters of amp=25 and freq=6,
          and applies it to the text between the tags.
        </TableCell>
        <TableCell>
          <code>{'The text will be {w}wavy{/w}'}</code>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default DialogueMessageInstructions;
