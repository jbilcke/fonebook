import { ArchiveFilled, ArchiveOutlined, Button, Spacer, Typography } from "@aircall/tractor";
import { useMutation } from "@apollo/client";
import { ARCHIVE_CALL } from "../../queries";
import { ArchiveCall, ArchiveCallVariables } from "../../queries/__generated__/ArchiveCall";
import { getContext } from "../../services/client";
import { Call } from "../../types";

export const CallArchiver = ({
  nbSelected = 0,
  onUnselect,
  selection = {},
  onArchived,
}: {
  nbSelected: number
  onUnselect: () => void
  onArchived: (archived: Call[]) => void
  selection?: Record<string, Call>
}) => {

  const [archive] = useMutation<ArchiveCall, ArchiveCallVariables>(
    ARCHIVE_CALL,
    {
      context: getContext(),
      onCompleted: ({ archiveCall }: { archiveCall: Call }) => {
        console.log('archived call:', archiveCall);
      }
    }
  );

  const onClick = async () => {
    const ids = Object.keys(selection);
    console.log('going to archive the calls:', ids);
    const archived: Call[] = [];
    for await (const id of ids) {
      try {
        console.log('trying to archive', id);
        await archive({
          variables: {
            id,
          }
        });
        archived.push(selection[id]);
      } catch (err) {
        console.log('failed to archive', err);
      }
    }
    onArchived(archived);
  }
  return (
    <Spacer direction="horizontal" space="xxs" justifyContent="space-between" alignItems="center">
      {nbSelected > 0 && <Button size="small" mode="outline" variant="black" onClick={onUnselect}>Unselect</Button>}
      <Button
        size="small"
        variant={nbSelected ? 'primary' : 'darkGhost'}
        disabled={nbSelected === 0}
        onClick={onClick}
      >
        {nbSelected === 0 ? <ArchiveOutlined /> : <ArchiveFilled color="primary.lighter" /> }
        <Typography variant="body">Toggle Archive</Typography>
      </Button>
    </Spacer>
  )
}